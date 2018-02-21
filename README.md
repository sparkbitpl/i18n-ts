i18n-ts
=======

I18n-ts is a type safe internationalization utility for TypeScript. The i18n messages are defined as plain TypeScript objects:

 ```typescript

const en = {
    hello: "Hi!"
    greeting: (name: string) => `Hi ${name}`
};

const de = {
    hello: "Hallo!",
    greeting: (name: string) => `Hallo ${name}`
};
const i18n = {
    en: en,
    de: de,
    default: en
};

const messages = new I18nResolver(i18n, "de").translation;

// TypeScript will infere the precise type of messages
console.log(messages.hello);
 ```