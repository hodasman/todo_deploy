import React from 'react'
class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', repository: '', author: 0 }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repository, this.state.author)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                    <input type="text" className="form-control" name="name"
                        value={this.state.name} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="repository">repository</label>
                <input type="text" className="form-control" name="repository"
                    value={this.state.repository} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                <label for="author">author</label>
<input type="number" className="form-control" name="author"
value={this.state.author} onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default ProjectForm