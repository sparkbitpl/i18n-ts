import {I18n} from "./I18n";

const isCookieAvailable = (typeof document) != "undefined";
export class I18nResolver<P> {
    private cookieName = "i18n-language";
    private currentLanguage: string = null;
    constructor(private translations: I18n<P>, preferredLanguage?: string) {
        // get the current language from cookie, browser locale
        const language = preferredLanguage || this.getCookie(this.cookieName) || this.getBrowserLanguage();
        this.language = this.findBestMatch(language) || "default";
    }

    public get translation(): P {
        return this.translations[this.currentLanguage];
    }
    public get language() {
        return this.currentLanguage;
    }
    public set language(lang: string) {
        this.currentLanguage = lang;
        this.setCookie(this.cookieName, lang);
    }

    private setCookie(name: string, value: string, expires?: Date, path?: string) {
        if (!isCookieAvailable) {
            return;
        }
        let expiration = expires ? "; expires=" + expires.toUTCString() : "";
        let cookieStr = `${name}=${value}${expiration}`;
        if (path) {
            cookieStr += ";path=" + path;
        }
        document.cookie = cookieStr;
    }

    private getCookie(name: string): string {
        if (!isCookieAvailable) {
            return null;
        }
        let cookie: string[] = document.cookie
            .split(";")
            .map(cookieStr => cookieStr.trim())
            .filter(cookieStr => cookieStr.match(name + "=.*"));

        return cookie.length > 0 ? cookie[0].replace(name + "=", "") : null;
    }

    private getBrowserLanguage(): string {
        return navigator.language || (navigator as any).userLanguage; // fallback for IE
    }

    private findBestMatch(language: string) {
        if (this.translations[language]) {
            return language;
        }
        // in case of language variants, e.g. en-US, check for basic variant (en) as well
        const langPrefix = language.split("-")[0];
        if (this.translations[langPrefix]) {
            return langPrefix;
        }
        return null;
    }
}
