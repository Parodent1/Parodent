import { useState } from "react";
import "./staffActionBtn.css";

function StuffActionBtn() {

  const [selectedFilter, setSelectedFilter] = useState("");
  const filters = ["Name A–Z", "Status"];

  const handleFilterSelect = (e) => {
    setSelectedFilter(e.target.value)
  }
  return (
    <div className="actionBtnBody">
      <div className="staffActionBtnContent">
        <button className="ActionBtn searchBtn">
          <span class="material-symbols-outlined" style={{ color: "#FF5858" }}>
            search
          </span>
          <input
            id="comment"
            name="search"
            type="text"
            placeholder="Search..."
            className="input searchInput"
          />
        </button>

        <div className="ActionBtn ">
          <span class="material-symbols-outlined" style={{ color: "#FF5858" }}>filter_list</span>
          <select name="filter" className="SelectBtn" onChange={handleFilterSelect} value={selectedFilter}>
            {filters.map((filter, index) => (
              <option key={index} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default StuffActionBtn;

// календар -> пошук
// створення запису -> фільтр
