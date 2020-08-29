import React, { memo } from 'react'

import { util } from '../../util'
import { Menu } from './index'
import { ConfirmationModal } from './index'
import { constants } from '../../constants'

/**
 *
 * @param deleteHandler {Callback} -> Callback to delete the promo
 * @param editHandler {Callback} -> callback to redirect the user to promo detail page
 * @param id {String}
 * @param is_live {Boolean}
 * @param name {String}
 * @param qa_is_live {Boolean}
 * @param renderMenu {renderProps}
 * @param status {Boolean}
 * @param user_role {String}
 * @param publishContentHandler {Callback}
 * @param isEditable {Boolean}
 * @returns {*}
 */
const PromoMenuActions = ({
    deleteHandler,
    editHandler,
    id,
    is_live,
    name,
    qa_is_live,
    renderMenu,
    status,
    user_role,
    publishContentHandler,
    isEditable,
}) => {
    const renderConfirmList = () => (
        <ul>
            <li>{name}</li>
        </ul>
    )

    const renderDeleteModal = props => (
        <ConfirmationModal
            renderList={renderConfirmList}
            submitHandler={() => deleteHandler([{ _id: id }])}
            action={'Delete'}
            records={'promos'}
            {...props}
        />
    )

    const renderQAPublishModal = props => (
        <ConfirmationModal
            renderList={renderConfirmList}
            submitHandler={() => publishContentHandler('qa', id)}
            action={util._QAStatus(qa_is_live)}
            records={'promo'}
            {...props}
        />
    )

    const renderProdPublishModal = props => (
        <ConfirmationModal
            renderList={renderConfirmList}
            submitHandler={() => publishContentHandler('prod', id)}
            action={util._ProdStatus(is_live)}
            records={'promo'}
            {...props}
        />
    )

    const shouldAppearProdOpt =
        status !== 'incomplete' &&
        status !== 'finished' &&
        (user_role === constants.roles['admin'] || user_role === constants.roles['admin_test'])

    return (
        <Menu
            listWidth={'lg'}
            placement={'left'}
            tipPlacement={'right'}
            margin={'mt-3'}
            renderProps={renderMenu}
        >
            <Menu.MenuItem show={isEditable} onClick={() => editHandler(id)}>
                Edit
            </Menu.MenuItem>
            <Menu.MenuItem show={!(qa_is_live || is_live)} onClick={renderDeleteModal}>
                Delete
            </Menu.MenuItem>
            <Menu.MenuItem
                show={status !== 'incomplete' && status !== 'finished'}
                onClick={renderQAPublishModal}
            >
                {util._QAStatus(qa_is_live).replace('for', '')}
            </Menu.MenuItem>
            <Menu.MenuItem show={shouldAppearProdOpt} onClick={renderProdPublishModal}>
                {util._ProdStatus(is_live)}
            </Menu.MenuItem>
        </Menu>
    )
}

export default memo(PromoMenuActions)
