import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const Layout = lazy(() => import('../components/feature/Layout'));
const HomePage = lazy(() => import('../pages/home/page'));
const ShopPage = lazy(() => import('../pages/shop/page'));
const ProductPage = lazy(() => import('../pages/product/page'));
const HairHubPage = lazy(() => import('../pages/hair-hub/page'));
const ArticleLifestylePage = lazy(() => import('../pages/hair-hub/article-lifestyle/page'));
const ArticleCarePage = lazy(() => import('../pages/hair-hub/article-care/page'));
const ArticleTexturePage = lazy(() => import('../pages/hair-hub/article-texture/page'));
const ArticleSummerMistakesPage = lazy(() => import('../pages/hair-hub/article-summer-mistakes/page'));
const ArticleSummerSignaturePage = lazy(() => import('../pages/hair-hub/article-summer-signature/page'));
const ArticleRawVsVirginPage = lazy(() => import('../pages/hair-hub/article-raw-vs-virgin/page'));
const HelpPage = lazy(() => import('../pages/help/page'));
const ShippingPolicyPage = lazy(() => import('../pages/shipping-policy/page'));
const PrivacyPolicyPage = lazy(() => import('../pages/privacy-policy/page'));
const TermsOfServicePage = lazy(() => import('../pages/terms-of-service/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/shop',
        element: <ShopPage />,
      },
      {
        path: '/shop/:id',
        element: <ProductPage />,
      },
      {
        path: '/product/:id',
        element: <ProductPage />,
      },
      {
        path: '/hair-hub',
        element: <HairHubPage />,
      },
      {
        path: '/hair-hub/hair-extensions-for-your-lifestyle',
        element: <ArticleLifestylePage />,
      },
      {
        path: '/hair-hub/how-to-care-for-your-hair-extensions',
        element: <ArticleCarePage />,
      },
      {
        path: '/hair-hub/choosing-the-right-hair-texture',
        element: <ArticleTexturePage />,
      },
      {
        path: '/hair-hub/4-mistakes-ruining-your-hair-extensions-every-summer',
        element: <ArticleSummerMistakesPage />,
      },
      {
        path: '/hair-hub/your-summer-signature',
        element: <ArticleSummerSignaturePage />,
      },
      {
        path: '/hair-hub/raw-hair-vs-virgin-hair',
        element: <ArticleRawVsVirginPage />,
      },
      {
        path: '/help',
        element: <HelpPage />,
      },
      {
        path: '/shipping-policy',
        element: <ShippingPolicyPage />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: '/terms-of-service',
        element: <TermsOfServicePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export default routes;
