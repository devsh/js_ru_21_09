import React, {Component} from 'react'
import Select from 'react-select'
import ArticleList from './ArticleList'
import ArticlesChart from './ArticlesChart'
import 'react-select/dist/react-select.css'
import Calendar from './Calendar'


class App extends Component {
    state = {
        selected: null,
        username: ''
    }

    render() {
        const {articles} = this.props

        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        const {selected, username} = this.state

        return (
            <div>
                <h1>App name</h1>
                <Calendar />
                User: <input type = 'text' value = {username} onChange = {this.handleUserChange}/>
                <Select options={options} value={selected} onChange={this.handleChange} multi />
                <ArticleList articles={articles}/>
                <ArticlesChart articles={articles}/>
            </div>
        )
    }

    handleChange = selected => {
        console.log('----', selected)
        return this.setState({ selected })
    }

    handleUserChange = ev => {
        if (ev.target.value.length > 10) return this.setState({
            username: ''
        })

        this.setState({
            username: ev.target.value
        })
    }
}

export default App