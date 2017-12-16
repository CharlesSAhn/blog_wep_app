import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar,Menu, Icon } from 'semantic-ui-react'

class TopBar extends Component {

    render() {


        return (
            <div>
                <Sidebar as={Menu} animation='scale down' direction='top' visible={true} inverted>
                    <Menu.Item name='home'>
                        <Icon name='home' />
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item name='add circle'>
                        <Icon name='add circle' />
                        <Link to="/addNew">Add New Post</Link>
                    </Menu.Item>
                </Sidebar>
            </div>

        )

    }
}

export default TopBar