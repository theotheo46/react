const staticCacheName = 'static-cache-wp-app-v6'
const dynamicCacheName = 'dynamic-cache-wp-app-v1'
const assetsUrls = [
  'index.html',
  'wave.png',
  'minilending.svg',
  'home.svg',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/styles/App.pcss',
  '/src/styles/index.pcss',
  '/src/styles/palettes.pcss',
  '/src/styles/vars.pcss',
  '/src/routes/routes.tsx',
  '/src/assets/icons/icon-mode-1.svg',
  '/src/assets/icons/icon-mode-2.svg',
  '/src/assets/images/default-avatar.jpg',
  '/src/assets/images/game-preview.png',
  '/src/assets/images/thumb-up.png',
  '/src/components/Bottle/index.tsx',
  '/src/components/Bottle/FillTypeColor.tsx',
  '/src/components/Button/index.tsx',
  '/src/components/Button/Button.pcss',
  '/src/components/DevFooter/index.tsx',
  '/src/components/DevFooter/DevFooter.pcss',
  '/src/components/ErrorBoundary/index.tsx',
  '/src/components/ErrorBoundary/ErrorComponent/index.tsx',
  '/src/components/ErrorBoundary/ErrorComponent/ErrorComponent.pcss',
  '/src/components/ErrorInformer/index.tsx',
  '/src/components/ErrorInformer/ErrorInformer.pcss',
  '/src/components/Form/index.tsx',
  '/src/components/Form/Form.pcss',
  '/src/components/ForumSection/index.tsx',
  '/src/components/ForumSection/ForumSection.pcss',
  '/src/components/Game/FinishGame/index.tsx',
  '/src/components/Game/FinishGame/FinishGame.pcss',
  '/src/components/Game/LoaderGame/index.tsx',
  '/src/components/Game/LoaderGame/LoaderGame.pcss',
  '/src/components/Game/StartGame/index.tsx',
  '/src/components/Game/StartGame/StartGame.pcss',
  '/src/components/Game/StartGame/StartGameHeader/index.tsx',
  '/src/components/Game/StartGame/StartGameHeader/StartGameHeader.pcss',
  '/src/components/Game/StartGame/StartGameImage/index.tsx',
  '/src/components/Game/StartGame/StartGameImage/StartGameImage.pcss',
  '/src/components/Game/StartGame/StartGameNav/index.tsx',
  '/src/components/Game/StartGame/StartGameNav/StartGameNav.pcss',
  '/src/components/Input/index.tsx',
  '/src/components/Input/Input.pcss',
  '/src/components/Memo/index.tsx',
  '/src/components/Memo/Memo.pcss',
  '/src/components/Modal/index.tsx',
  '/src/components/Modal/Modal.pcss',
  '/src/components/Modal/ModalOverlay/index.tsx',
  '/src/components/Modal/ModalOverlay/ModalOverlay.pcss',
  '/src/components/Navigation/Navigation.tsx',
  '/src/hooks/useStartLevel.ts',
  '/src/layouts/Layout.tsx',
  '/src/pages/HomePage.tsx',
  '/src/pages/FinishPage.tsx',
  '/src/pages/LevelPage.tsx',
  '/src/pages/NotFoundPage.tsx',
  '/src/pages/StartPage.tsx',
  '/src/pages/ErrorPage/ErrorPage.tsx',
  '/src/pages/ErrorPage/ErrorPage.pcss',
  '/src/pages/MiniLendingPage/MiniLendingPage.tsx',
  '/src/pages/MiniLendingPage/MiniLendingPage.pcss',
  '/src/store/hooks.ts',
  '/src/store/index.ts',
  '/src/store/slices/gameSlice/index.ts',
  '/src/store/slices/gameSlice/types.ts',
  '/src/store/slices/userSlice/index.ts',
  '/src/store/slices/userSlice/types.ts',
  '/src/store/slices/userSlice/userAsyncThunks.ts',
  '/src/utils/AlgorithmDrawPartOfBottle.tsx',
  '/src/utils/FunctionArray.tsx',
  '/src/utils/validate-data.ts',
]

self.addEventListener('install', async event => {
  console.log('service worker is installed!', event)
  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetsUrls)
})

self.addEventListener('activate', async event => {
  console.log('service worker is active!', event)
  const cachesNames = await caches.keys()
  await Promise.all(
    cachesNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? (await fetch(request))
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await caches.match(request)
    return cached ?? (await caches.match(staticCacheName))
  }
}
