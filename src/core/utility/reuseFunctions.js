import useFetch from "../../Hooks/useFetch";
import * as XLSX from "xlsx";

const callFetch = useFetch()
// ================for all drop down==========
export const loadDropdownOptions = async ({ 
  url, 
  setState, 
  setLoading, 
  stateKey = null, 
  valueKey = "id", 
  labelKey = "userName", 
  additionalKeys = [] 
}) => {
  try {
    setLoading(true);
    const { res, got } = await callFetch(url, "GET");
    if (res.status === 200 && got.status === 1) {
      const correctData = got.data.map((item) => {
        const mappedItem = {
          value: item[valueKey],
          label: item[labelKey],
        };

        // console.log(mappedItem)
    
        additionalKeys.forEach((key) => {
          if (item[key] !== undefined) {
            mappedItem[key] = item[key]; 
          }
        });
        return mappedItem;
      });

      if (stateKey) {
        setState((prev) => ({
          ...prev,
          [stateKey]: correctData,
        }));
      } else {
        setState(correctData);
      }
    } else {
      console.log("Response:", got);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false); 
  }
};
// ==================to load data on Table==========================
export const loadTableData = async ({url,setState,setLoading}) => {
  try {
    setLoading(true);
    const { res, got } = await callFetch(url, "GET");
    if (res.status == 200) {
      let alldata = got.data;
      setState(alldata)
      console.log("table-data", got);
    }
    setLoading(false);
    console.log("GET Response:", got);
  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
  }
};

export const modifyDataHandler = async ({
  url,
  setLoading,
  onSuccess,
  onError,
}) => {
  try {
    setLoading(true);


    console.log("API URL:", url); // Log the final API URL

    // Perform API call
    const { res, got } = await callFetch(url, "GET");

    console.log("API Response:", got); // Log the full response

    if (res.status === 200 && got) {
      if (onSuccess && typeof onSuccess === "function") {
        console.log("Data to Pass to onSuccess:", got.data); // Log data before passing it
        onSuccess(got.data);
      }
    } else {
      if (onError && typeof onError === "function") {
        console.error("API Error:", got.msg); // Log API error message
        onError(res.status, got.msg); // Handle specific API errors
      }
    }
  } catch (error) {
    console.error("Error in modifyDataHandler:", error);
    if (onError && typeof onError === "function") {
      onError(null, error.message || "Unknown error"); // Handle error in a more robust way
    }
  } finally {
    setLoading(false);
  }
};




  export const customerDropdown = async (partyData, setLoading) => {
    let url = `/api/LoadParty?rectype=1`;
    console.log("reload");
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status == 200) {
        let alldata = got.data;
        let correctData = alldata.map((item) => ({
          value: item.id,
          label: item.companyName,
        }));
        partyData(correctData);
        console.log("get Party", got);
      }
      setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };


  export const exportToExcel = (data, columns, headername) => {
    const displayedColumns = columns.map((col) => ({
      title: col.title,
      dataIndex: col.dataIndex,
      width: 20, 
    }));
  
 const exportData = data.map((row) => {
      const filteredRow = {};
      displayedColumns.forEach((col) => {
        filteredRow[col.title] = row[col.dataIndex] || ""; 
      });
      return filteredRow;
    });
  
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const headerRow = displayedColumns.map((col) => col.title);
    XLSX.utils.sheet_add_aoa(worksheet, [headerRow], { origin: "A1" });
  
    const headerRange = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      const cell = worksheet[cellAddress];
      if (cell) {
        cell.s = {
          fill: {
            fgColor: { rgb: "1890FF" }, // Blue background
          },
          font: {
            color: { rgb: "FFFFFF" }, // White text
            bold: true,
          },
          alignment: {
            horizontal: "center",
          },
        };
      }
    }
  
    worksheet["!cols"] = displayedColumns.map((col) => ({ width: col.width }));
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Styled Table Data");
  
    XLSX.writeFile(workbook, `${headername.replace(/\s+/g, '-')}.xlsx`);
  };

