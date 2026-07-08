const includePartials = async () => {
  const includes = [...document.querySelectorAll("[data-include]")];

  await Promise.all(
    includes.map(async (mount) => {
      const response = await fetch(mount.dataset.include);

      if (!response.ok) {
        throw new Error(`Could not load ${mount.dataset.include}`);
      }

      mount.outerHTML = await response.text();
    }),
  );
};

const setActiveNav = () => {
  const activeId = location.hash.slice(1) || "home";

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const isActive = link.dataset.navLink === activeId;

    link.toggleAttribute("aria-current", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    }
  });
};

includePartials()
  .then(setActiveNav)
  .catch((error) => console.error(error));

window.addEventListener("hashchange", setActiveNav);
