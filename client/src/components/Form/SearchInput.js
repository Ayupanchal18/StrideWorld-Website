import React from 'react';
import styled from 'styled-components';
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Move styled-components outside
const StyledWrapper = styled.div`
  .container {
    position: relative;
    --size-button: 40px;
    color: white;
  }

  .input {
    padding-left: var(--size-button);
    height: var(--size-button);
    font-size: 15px;
    border: none;
    color: #fff;
    outline: none;
    width: var(--size-button);
    transition: all ease 0.3s;
    background-color: #191A1E;
    box-shadow: 1.5px 1.5px 3px #0e0e0e, 
                -1.5px -1.5px 3px rgb(95 94 94 / 25%), 
                inset 0px 0px 0px #0e0e0e, 
                inset 0px -0px 0px #5f5e5e;
    border-radius: 50px;
    cursor: pointer;
  }

  .input:focus,
  .input:not(:invalid) {
    width: 200px;
    cursor: text;
    box-shadow: 0px 0px 0px #0e0e0e, 
                0px 0px 0px rgb(95 94 94 / 25%), 
                inset 1.5px 1.5px 3px #0e0e0e, 
                inset -1.5px -1.5px 3px #5f5e5e;
  }

  .input:focus + .icon,
  .input:not(:invalid) + .icon {
    pointer-events: all;
    cursor: pointer;
  }

  .container .icon {
    position: absolute;
    width: var(--size-button);
    height: var(--size-button);
    top: 0;
    left: 14px;
    padding: 7px 8px 12px 6px;
    pointer-events: none;
  }

  .container .icon svg {
    width: 100%;
    height: 100%;
  }
`;

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `/api/v1/product/search/${values.keyword}`
            );
            setValues((prev) => ({ ...prev, results: data }));
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StyledWrapper>
            <div>
                <form
                    className="d-flex search-form"
                    role="search"
                    onSubmit={handleSubmit}
                >
                    <div className="container">
                        <input
                            type="search"
                            className="input"
                            required
                            placeholder="Type to search..."
                            value={values.keyword}
                            onChange={(e) =>
                                setValues((prev) => ({ ...prev, keyword: e.target.value }))
                            }
                        />
                        <div className="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ionicon"
                                viewBox="0 0 512 512"
                            >
                                <title>Search</title>
                                <path
                                    d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeMiterlimit={10}
                                    strokeWidth={32}
                                />
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={32}
                                    d="M338.29 338.29L448 448"
                                />
                            </svg>
                        </div>
                    </div>

                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </StyledWrapper>
    );
};

export default SearchInput;
