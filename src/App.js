import { useState, useRef, useEffect } from 'react';
import jobs from './data.json';
import "./App.css";

export default function App() {
    const [filter, setFilter] = useState([]);

    return (
        <div className = "container">
            <Header />

            {filter.length > 0 
                ? <FilterBar
                    filter = {filter}
                    onFilterChange = {setFilter} /> 
                : <span></span>
            }

            <JobsList 
                jobs = {jobs}
                filter = {filter}
                onFilterChange = {setFilter} />
        </div>
    );
}

function Header() {

    return(
        <>
            <header className = "header"></header>
        </>
    );
}

function FilterBar({ filter, onFilterChange }) {
    const filterKewords = [];

    function removeFilter(f) {
        onFilterChange(filter.filter(item => item !== f));
    }
    
    filter.forEach((filter) => {
        filterKewords.push(
            <div className = "keyword-wraper">
                <span className = "filter-keyword">{filter}</span>
                <button 
                    onClick = {() => removeFilter(filter)} 
                    className = "remove-btn">
                    x
                </button>
            </div>
        );
    });
    
    return (
        <div id = "filter-bar" className = "container" >
            <div className = "filter-bar">
                { filterKewords }
            </div>
        </div>
    );
}

function JobsList({ jobs, filter, onFilterChange }) {
    const jobsList = [];

    jobs.forEach((job) => {
            let categories = [job.role, job.level];
            categories = categories.concat(job.tools);
            categories = categories.concat(job.languages);
            if(filter.every((el) => {return categories.includes(el) }) )
                jobsList.push(
                    <ListItem 
                        job = {job}
                        filter = {filter} 
                        onFilterChange = {onFilterChange} />
                );
    })


    return (
        <main className = "container">
            <ul>
                {jobsList}
            </ul>
        </main>
    );
}

function ListItem({ job, filter, onFilterChange }) {
    const tools = job.tools;
    const langs = job.languages;
    const categories = [];
    let featured;
     if (job.featured) {
        featured = <div className="featured-box">FEATURED</div>;
    }
    const neww = job.new
                    ? <div className = "new-box">NEW</div> 
                    : "";

    function handleCategoryClick(event) {
        if(event.target.className !== "categories") {
            let category = event.target.innerHTML;
            if(!filter.includes(category))
                onFilterChange([...filter, category]);
        }
    }

    categories.push(
        <p className = "category" >
            { job.role }
        </p>
    )

    categories.push(
        <p className = "category" >
            { job.level }
        </p>
    )
    
    tools.forEach((tool) => {
        categories.push(
            <p className = "category" >
                { tool }
            </p>
        );
    });

    langs.forEach((lang) => {
        categories.push(
            <p className = "category" >
                { lang }
            </p>
        );
    });


    return (
        <li id = {job.id} key = {job.id} className = "job">

            <section className = "job-info">

                <div className = "logo"><img clasName="img" src = { job.logo } alt = "logo" className = "img" /></div>

                <div className = "info-container">

                    <div className = "top">
                        <h2>{ job.company }</h2>                            
                        {neww}
                        {featured}
                    </div>

                    <a className = "position">{ job.position }</a>

                    <ul className = "availability">
                        <li>{ job.postedAt }</li>
                        <li>{ job.contract }</li>
                        <li>{ job.location }</li>
                    </ul>

                </div>

            </section>

            <section className = "categories" onClick = {(e) => handleCategoryClick(e)}>
                {categories}
            </section>

        </li>
    );
}