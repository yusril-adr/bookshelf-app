const GoTo = {
  async page(path) {
    window.history.pushState(
      {},
      path,
      `${window.location.origin}${path}`,
    );

    window.dispatchEvent(new Event('updatePage'));
  },

  async url(rawUrl) {
    const url = new URL(rawUrl);

    window.history.pushState(
      {},
      url.pathname,
      url,
    );

    if (url.origin === window.location.origin) {
      window.dispatchEvent(new Event('updatePage'));
    }
  },
};

export default GoTo;
