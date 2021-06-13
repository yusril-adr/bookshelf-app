import CONFIG from '../global/CONFIG';
import GoTo from '../routes/Go-To';

const LinkInitiator = {
  async init() {
    const elements = document.querySelectorAll(CONFIG.LINK_PAGE_ELEMENTS);

    elements.forEach((anchor) => {
      anchor.addEventListener('click', async (event) => {
        event.preventDefault();

        const urlLink = event.target.href;
        await GoTo.url(urlLink);
      });
    });
  },
};

export default LinkInitiator;
