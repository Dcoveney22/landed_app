/**
 * Template Name: Dewi
 * Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim(),
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        },
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false,
        );
      });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  //loading data

  const dataButton = document.getElementById("btn-check-prices");

  const dataResult = document.getElementById("data-result");
  const description = document.getElementById("descriptor");
  const modal = new bootstrap.Modal(document.getElementById("priceModal"));

  dataButton.addEventListener("click", async function (e) {
    e.preventDefault(); // stops page jumping
    dataButton.innerHTML = "Loading...";
    dataButton.disabled = true;
    dataResult.innerHTML = "Loading...";
    const response = await fetch("/priceCheck", {
      method: "POST",
    });

    const data = await response.json();
    if (!response.ok) {
      description.innerHTML = `<h6>${data.msg}<h6>`;
      dataButton.innerHTML = "Check Prices";
      dataButton.disabled = false;
      return;
    }
    if (data.length > 0) {
      dataResult.innerHTML = "";
      data.forEach((item) => {
        dataResult.innerHTML += `<li>${item}</li>`;
      });
      dataButton.innerHTML = "Check Prices";
      dataButton.disabled = false;
      modal.show();
    } else {
      description.innerHTML = `<h6>Landed has not flagged any pricing for review at this time</h6>`;
      dataButton.innerHTML = "Check Prices";
      dataButton.disabled = false;
    }
  });

  const csvDropzone = document.getElementById("csv-dropzone");
  csvDropzone.addEventListener("dragover", function (event) {
    event.preventDefault();
    csvDropzone.classList.add("dragover");
  });
  csvDropzone.addEventListener("dragleave", function (event) {
    event.preventDefault();
    csvDropzone.classList.remove("dragover");
  });
  csvDropzone.addEventListener("drop", function (event) {
    event.preventDefault();
    csvDropzone.classList.remove("dragover");
    const csvFile = event.dataTransfer.files[0];
    if (
      csvFile.type === "text/csv" ||
      csvFile.type === "application/vnd.ms-excel"
    ) {
      csvDropzone.innerHTML = "Loading...";
      description.innerHTML = "<h6>CSV file has been selected</h6>";
      handleCsvFile(csvFile);
      // csvDropzone.innerHTML = "Or drop CSV file here";
    } else {
      description.innerHTML = "<h6>Incorrect Format: file must be a .CSV<h6>";
    }
  });

  async function handleCsvFile(file) {
    const reader = new FileReader();
    reader.onload = async () => {
      const lines = reader.result.split("\n");
      console.log(lines);
      const response = await fetch("/csvData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lines),
      });
      const data = await response.json();
      if (!response.ok) {
        description.innerHTML = `<h6>${data.msg}<h6>`;
        return;
      }
      if (data.length > 0) {
        dataResult.innerHTML = "";
        data.forEach((item) => {
          dataResult.innerHTML += `<li>${item}</li>`;
        });
        dataButton.disabled = false;
        modal.show();
        dataButton.innerHTML = "Check Prices";
        csvDropzone.innerHTML = "Or drop CSV file here";
        description.innerHTML = "";
      } else {
        description.innerHTML = `<h6>Landed has not flagged any pricing for review at this time</h6>`;
        dataButton.innerHTML = "Check Prices";
        dataButton.disabled = false;
      }
    };

    reader.onerror = () => {
      showMessage("Error reading the file. Please try again.", "error");
    };
    // Read file into memory as UTF-8
    // console.log(reader.onload)
    reader.readAsText(file);

    console.log(file.name);
  }

  document
    .getElementById("downloadCSVTemplateBtn")
    .addEventListener("click", function () {
      console.log("CLICKED");

      const link = document.createElement("a");
      link.href = "../data/landed_template.csv";
      link.download = "landed_template.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
})();
