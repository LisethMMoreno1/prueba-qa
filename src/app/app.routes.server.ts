import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'login', renderMode: RenderMode.Server },
  { path: 'profile', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server } 
];
