import completedList from '../views/pages/completedList';
import uncompletedList from '../views/pages/uncompletedList';
import search from '../views/pages/search';

const routes = {
  '/': completedList,
  '/uncompleted-list': uncompletedList,
  '/search/:keyword': search,
};

export default routes;
