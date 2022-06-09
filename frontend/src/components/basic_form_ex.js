import { useEffect, useState } from "react"

export function JobCreate() {
    const [title, setTitle] = useState("")
    const [companyName, setCompanyName] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        console.log(title)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input 
                        id="title" 
                        name="title" 
                        type="text" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} />
                    <button>Submit</button>
                </div>
                <div>
                    <label htmlFor="Company_name">Company name</label>
                    <input 
                        id="Company_name" 
                        name="company_name" 
                        type="text" 
                        value={companyName} 
                        onChange={e => setCompanyName(e.target.value)} />
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}