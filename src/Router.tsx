import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Post from './components/Post';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      // children: [
      //   {
      //     path: '/post/:id',
      //     element: <Post />,
      //   },
      // ],
    },
    {
      path: '/post/:id',
      element: <Post />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
