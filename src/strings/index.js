import LocalizedStrings from 'react-localization'
import { uiElements } from './uiElements'
import { placeHolders } from './placeHolders'
import { uiMessages } from './uiMessages'

export const strings = new LocalizedStrings({
    en: {
        ...uiElements.en,
        ...placeHolders.en,
        ...uiMessages.en,
    },
    es: {
        ...uiElements.es,
        ...placeHolders.es,
        ...uiMessages.es,
    },
})
