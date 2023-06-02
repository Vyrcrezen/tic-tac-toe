import LocalizationData from "./types/LocalizationData"
import * as _ from 'lodash';

import localeEn from '../lang/en.json';
import getDefaultLocalizationData from "../initializers/getDefaultLocalizationData";

const defaultLocalizationStore: LocalizationData = getDefaultLocalizationData();

export default defaultLocalizationStore