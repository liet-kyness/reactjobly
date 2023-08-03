import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/Loading";

function CompanyList() {
    console.debug("CompanyList");
    const [companies, setCompanies] = useState(null);
    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
    }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    };

    if (!companies) return <LoadingSpinner />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {companies.length ? (
                <div className="CompanyList-list">
                    {companies.map(comp => (
                        <CompanyCard
                            key={comp.handle}
                            handle={comp.handle}
                            name={comp.name}
                            description={comp.description}
                            logoUrl={comp.logoUrl}
                        />
                    ))}
                </div>
            ) : (
                <p className="lead">No results found</p>
            )}
        </div>
    );
}

export default CompanyList;