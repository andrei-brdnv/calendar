import React, {FC} from "react";
import {Layout, Menu, Row} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AuthActionCreators} from "../store/reducers/auth/ac";
import {useDispatch} from "react-redux";
import {useActions} from "../hooks/useActions";
import {Content, Header} from "antd/es/layout/layout";

export const Navbar: FC = () => {
    const history = useHistory()
    const { isAuth, user } = useTypedSelector(state => state.auth)
    const {logout} = useActions()

    return (
        <Layout>
            <Header>
                {isAuth
                    ?
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item
                            disabled={true}
                        >
                            {user.username}
                        </Menu.Item>
                        <Menu.Item
                            onClick={logout}
                            key={1}
                        >
                            Logout
                        </Menu.Item>
                    </Menu>
                    :
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item
                            onClick={() => history.push(RouteNames.LOGIN)}
                            key={1}
                        >
                            Sign in
                        </Menu.Item>
                    </Menu>
                }
            </Header>

        </Layout>
    );
};