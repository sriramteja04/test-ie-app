import { common } from './common'
import { promotions } from './promotionsUtil'
import { Icons } from './IconsUtil'
import { reduxUtil } from './reduxUtil'
import { dateUtil } from './dateUtil'

export const util = {
    ...common,
    ...promotions,
    ...Icons(),
    ...reduxUtil,
    ...dateUtil,
}
