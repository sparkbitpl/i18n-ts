import "jasmine";
import {I18nResolver} from "../src/i18n";

const en = {
    "foo": "foo"
}

const de = {
    "foo": "Fuu"
}

const i18n = {
    en: en,
    de: de,
    default: en
}

describe("i18n-ts",() => {
    it("should use preferred language submitted by the user", () => {
        let resolver = new I18nResolver(i18n, "de");
        expect(resolver.language).toBe("de");
        expect(resolver.translation).toBe(de);
    });

    it("should use default language instead of an unknown", () => {
        let resolver = new I18nResolver(i18n, "pl");
        expect(resolver.language).toBe("default");
        expect(resolver.translation).toBe(en);
    });

    it("should select en for en-US", () => {
        let resolver = new I18nResolver(i18n, "en-US");
        expect(resolver.language).toBe("en");
        expect(resolver.translation).toBe(en);
    });
});