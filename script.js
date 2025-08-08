document.addEventListener("DOMContentLoaded", () => {
  // --- Global State & DOM Elements ---
  let isLoggedIn = false;
  const getStartedBtn = document.getElementById("get-started-btn");
  const mobileGetStartedBtn = document.getElementById("mobile-get-started-btn");
  const exploreGigsBtn = document.getElementById("explore-gigs-btn");
  const learnMoreBtn = document.getElementById("learn-more-btn");
  const postGigSection = document.getElementById("post-gig");
  const postForm = document.getElementById("post-form");
  const subscriptionForm = document.getElementById("subscription-form");
  const addGigBtn = document.getElementById("add-gig-btn");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMobileMenuBtn = document.getElementById("close-mobile-menu");
  const profilePicUpload = document.getElementById("profile-pic-upload");
  const profilePic = document.getElementById("profile-pic");
  const searchTab = document.getElementById("search-tab");
  const searchContent = document.getElementById("search-content");
  const menuTab = document.getElementById("menu-tab");
  const menuContent = document.getElementById("menu-content");
  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");

  // --- GSAP Animations ---
  gsap.utils.toArray(".card-section").forEach((section, i) => {
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: i * 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onComplete: () => section.classList.add("visible"),
    });
  });

  gsap.fromTo(
    "#hero-section h2",
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
  );
  gsap.fromTo(
    "#hero-section p",
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
  );
  gsap.fromTo(
    "#hero-section div",
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" }
  );

  // --- Tab Bar Logic ---
  searchTab.addEventListener("click", () => {
    const isHidden = searchContent.classList.contains("hidden");
    searchContent.classList.toggle("hidden", !isHidden);
    menuContent.classList.add("hidden");
    searchTab.classList.toggle("active", isHidden);
    menuTab.classList.remove("active");
    gsap.to(searchContent, {
      opacity: isHidden ? 1 : 0,
      y: isHidden ? 0 : -10,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  menuTab.addEventListener("click", () => {
    const isHidden = menuContent.classList.contains("hidden");
    menuContent.classList.toggle("hidden", !isHidden);
    searchContent.classList.add("hidden");
    menuTab.classList.toggle("active", isHidden);
    searchTab.classList.remove("active");
    gsap.to(menuContent, {
      opacity: isHidden ? 1 : 0,
      y: isHidden ? 0 : -10,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  categoriesBtn.addEventListener("click", () => {
    categoriesDropdown.classList.toggle("hidden");
    gsap.to(categoriesDropdown, {
      opacity: categoriesDropdown.classList.contains("hidden") ? 0 : 1,
      y: categoriesDropdown.classList.contains("hidden") ? -10 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  // --- Mobile Menu Toggle ---
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-x-full");
    gsap.from(mobileMenu.querySelectorAll("a, button"), {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  closeMobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
  });

  // --- Smooth Scroll to Sections ---
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      mobileMenu.classList.add("translate-x-full");
    }
  };

  getStartedBtn.addEventListener("click", () => scrollToSection("post-gig"));
  mobileGetStartedBtn.addEventListener("click", () =>
    scrollToSection("post-gig")
  );
  exploreGigsBtn.addEventListener("click", () => scrollToSection("post-gig"));
  learnMoreBtn.addEventListener("click", () => scrollToSection("about"));
  addGigBtn.addEventListener("click", () => scrollToSection("post-gig"));

  // --- Form Submission Handlers ---
  subscriptionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = subscriptionForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    if (email && email.includes("@")) {
      alert(`Thank you for subscribing with ${email}!`);
      emailInput.value = "";
      gsap.from(subscriptionForm, {
        scale: 0.95,
        opacity: 0.8,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      alert("Please enter a valid email address.");
    }
  });

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postContent = postForm.querySelector("textarea").value.trim();
    const fileInput = postForm.querySelector('input[type="file"]').files[0];
    const linkInput = postForm.querySelector('input[type="url"]').value.trim();
    const tagsInput = postForm.querySelector('input[type="text"]').value.trim();

    if (postContent) {
      const postDiv = document.createElement("div");
      postDiv.className =
        "bg-card-bg/70 p-6 rounded-xl shadow-lg transform scale-0";
      postDiv.innerHTML = `
                <p class="text-text-light">${postContent}</p>
                ${
                  fileInput
                    ? `<p class="text-text-muted text-sm mt-2">File: ${fileInput.name}</p>`
                    : ""
                }
                ${
                  linkInput
                    ? `<a href="${linkInput}" class="text-primary-teal hover:text-primary-blue transition-all duration-200 mt-2 block">${linkInput}</a>`
                    : ""
                }
                ${
                  tagsInput
                    ? `<p class="text-text-muted text-sm mt-2">Tags: ${tagsInput}</p>`
                    : ""
                }
            `;
      postPreview.appendChild(postDiv);
      gsap.to(postDiv, { scale: 1, duration: 0.4, ease: "back.out(1.7)" });
      postForm.reset();
      alert("Your gig has been successfully posted!");
    } else {
      alert("Please describe your gig before posting.");
    }
  });

  // --- Profile Picture Upload ---
  profilePicUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        profilePic.src = event.target.result;
        gsap.from(profilePic, {
          scale: 0.7,
          opacity: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      };
      reader.readAsDataURL(file);
    }
  });

  // --- Search Functionality ---
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    console.log(`Searching for: ${e.target.value}`);
    // Add backend search integration here
  });

  // --- Close Dropdowns on Outside Click ---
  document.addEventListener("click", (e) => {
    if (!searchTab.contains(e.target) && !searchContent.contains(e.target)) {
      searchContent.classList.add("hidden");
      searchTab.classList.remove("active");
      gsap.to(searchContent, { opacity: 0, y: -10, duration: 0.4 });
    }
    if (!menuTab.contains(e.target) && !menuContent.contains(e.target)) {
      menuContent.classList.add("hidden");
      menuTab.classList.remove("active");
      gsap.to(menuContent, { opacity: 0, y: -10, duration: 0.4 });
    }
    if (
      !categoriesBtn.contains(e.target) &&
      !categoriesDropdown.contains(e.target)
    ) {
      categoriesDropdown.classList.add("hidden");
      gsap.to(categoriesDropdown, { opacity: 0, y: -10, duration: 0.4 });
    }
  });
});
