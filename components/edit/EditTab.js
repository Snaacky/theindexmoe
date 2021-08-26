import React from "react"
import Link from "next/link"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export default class EditTab extends React.Component {
    constructor({tabs, tablesDatalist, _id, urlId, title, nsfw, description, tables}) {
        super({tabs, tablesDatalist, _id, urlId, title, nsfw, description, tables})


        this.tablesDatalist = tablesDatalist.sort((a, b) => a.name > b.name ? 1 : -1)
        this.tabsDatalist = tabs.map(t => t.name)
        this.urlDatalist = tabs.map(t => t.urlId)

        const tablesNotSelected = tables ? this.tablesDatalist.filter(tDL => !tables.some(t => t._id === tDL._id))
            : this.tablesDatalist
        this.state = {
            _id,
            urlId: urlId || "",
            title: title || "",
            nsfw: nsfw || false,
            description: description || "",
            tables: tables || [],
            tablesNotSelected: tablesNotSelected
        }
    }

    saveTab() {
        if (this.state.name !== "" && this.state.urlId !== "") {
            if (this.state.urlId === "_new") {
                return alert("Illegal url id: '_new' is forbidden!")
            }

            let body = {
                urlId: this.state.urlId,
                title: this.state.name,
                nsfw: this.state.nsfw,
                description: this.state.description,
                tables: this.state.tables
            }
            if (this.state._id) {
                body._id = this.state._id
            }

            fetch("/api/edit/tab", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            }).then(r => {
                if (r.status !== 200) {
                    alert("Failed to save data: Error " + r.status)
                } else {
                    alert("Changes have been saved")
                    if (typeof this.state._id === "undefined") {
                        window.location.href = "/tabs"
                    }
                }
            })
        } else {
            alert("Wow, wow! Wait a minute bro, you forgot to fill in the title and url id")
        }
    }

    render() {
        return <form>
            <div className={"row"}>
                <div className={"col-12 col-lg-6 mb-3"}>
                    <label htmlFor={"createTabInputName"} className={"form-label"}>
                        Name
                    </label>
                    <input type={"text"} className={"form-control"} id={"createTabInputName"} value={this.state.name}
                           list={"createTabInputNameDatalist"} aria-describedby={"createTabInputNameHelp"}
                           placeholder={"Enter a title"} required={true}
                           onChange={(input) => {
                               this.setState({title: input.target.value})
                           }}/>
                    <datalist id={"createTabInputNameDatalist"}>
                        {this.tabsDatalist.map(t => <option value={t} key={t}/>)}
                    </datalist>
                    <div id={"createTabInputNameHelp"} className={"form-text"}>
                        Shown name of tab
                    </div>
                </div>
                <div className={"col-12 col-lg-6 mb-3"}>
                    <label htmlFor={"createTabInputURL"} className={"form-label"}>
                        URL
                    </label>
                    <input type={"text"} className={"form-control"} id={"createTabInputURL"} value={this.state.urlId}
                           list={"createTabInputURLDatalist"} aria-describedby={"createTabInputURLHelp"}
                           placeholder={"Enter the url id"} required={true}
                           onChange={(input) => {
                               this.setState({urlId: input.target.value})
                           }}/>
                    <datalist id={"createTabInputURLDatalist"}>
                        {this.urlDatalist.map(t => <option value={t} key={t}/>)}
                    </datalist>
                    <div id={"createTabInputURLHelp"} className={"form-text"}>
                        Identifier used for the URLs, must be a string containing only <code>[a-z0-9-_]</code>
                    </div>
                </div>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="createTabInputNSFW" value={this.state.nsfw}
                       onChange={(input) => {
                           this.setState({nsfw: input.target.checked})
                       }}/>
                <label className="form-check-label" htmlFor="createTabInputNSFW">
                    NSFW: contains adult only content
                </label>
            </div>
            <div className="mb-3">
                <label htmlFor="createTabInputDescription" className="form-label">Description</label>
                <textarea className="form-control" id="createTabInputDescription" rows="3"
                          placeholder={"Enter a fitting description"} value={this.state.description}
                          onChange={(input) => {
                              this.setState({description: input.target.value})
                          }}/>
            </div>

            <button className={"btn btn-primary mb-2"} type="button" onClick={() => this.saveTab()}>
                <FontAwesomeIcon icon={["fas", "save"]} className={"me-2"}/>
                {typeof this.state._id === "undefined" ? "Create tab" : "Save changes"}
            </button>
            <span className={"float-end"}>
                <Link href={"/tabs"}>
                    <a className={"btn btn-outline-secondary"}>
                        Tab manager
                        <FontAwesomeIcon icon={["fas", "arrow-alt-circle-right"]} className={"ms-2"}/>
                    </a>
                </Link>
            </span>
        </form>
    }
}
