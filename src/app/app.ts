import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, ButtonModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FitnessApp');
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);
  
  isDarkMode = signal(false);
  currentLang = signal('en');

  constructor() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.updateDirection('en');
  }

  toggleDarkMode() {
    this.isDarkMode.update(dark => !dark);
    if (this.isDarkMode()) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }

  toggleLanguage() {
    const newLang = this.currentLang() === 'en' ? 'ar' : 'en';
    this.currentLang.set(newLang);
    this.translate.use(newLang);
    this.updateDirection(newLang);
  }

  private updateDirection(lang: string) {
    this.document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.document.documentElement.lang = lang;
  }
}
