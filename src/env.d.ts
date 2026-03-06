/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    title?: string;
    locale?: string;
    isBlogpost?: boolean;
    L?: any;
  }
}
