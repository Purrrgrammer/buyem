import React, { useState } from "react";
import { Product } from "../../model";
import { setMock } from "../../slices/mock-slice/MockSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [searchValue, setSearchValue] = useState<string>("");

  const deletesearchvalue = () => {
    setSearchValue("");
    dispatch(setMock(products));
  };
  const search = () => {
    // setSearchValue("");
    const result = products.filter((el: Product) =>
      el.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    // console.log(`result ${result}`);
    dispatch(setMock(result));
  };
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const filterByCategory = (category: string) => {
    if (category === "All CATEGORY") {
      dispatch(setMock(products));
    } else {
      const result = products.filter((el: Product) => el.category === category);
      dispatch(setMock(result));
    }
  };
  const getCategory = (products: Product[]) => {
    let uniqueCategory: string[] = ["All CATEGORY"];
    products.forEach((element: Product) => {
      if (!uniqueCategory.includes(element.category)) {
        uniqueCategory.push(element.category);
      }
    });
    return uniqueCategory;
  };
  const uniqueCategory = getCategory(products);
  const categoryoption = uniqueCategory.map(
    (category: string, index: number) => (
      <option key={index} value={category}>
        {category.toUpperCase()}
      </option>
    )
  );

  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
        className="seachbar-container"
      >
        <button type="submit">SEARCH</button>
        <input
          name="searchval"
          id="searchval"
          type="text"
          className="searchbar"
          placeholder="What Are You Looking For?"
          onChange={searchHandler}
          value={searchValue}
        />
        {searchValue && (
          <button type="button" onClick={deletesearchvalue}>
            <svg
              className="x"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </button>
        )}
      </form>
      <div className="mb-2">
        <select
          id="select-product"
          onChange={(e) => {
            filterByCategory(e.target.value);
          }}
        >
          {categoryoption}
        </select>
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
