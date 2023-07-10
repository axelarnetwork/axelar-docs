export const safeLinks = () => {
  
    [...document.links].map((link) => {
      if(link.hostname === window.location.hostname) return;
      link.relList.add("noopener");
      link.relList.add("noreferrer");
    });
  };

safeLinks();