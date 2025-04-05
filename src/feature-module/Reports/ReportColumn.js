export const poDetailsColumns = [
      {
        title: "Po Number",
        dataIndex: "vchNo",
        sorter: (a, b) => a.vchNo.localeCompare(b.vchNo, undefined, { numeric: true, sensitivity: 'base' }),
      },
  
      {
        title:"Supplier",
        dataIndex: "supplier",
        sorter: (a, b) => a.supplier.length - b.supplier.length,
      },
      {
        title:"PO Date",
        dataIndex: "date",
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
      },
      
    //   {
    //     title: "Item Code",
    //     dataIndex: "mobile",
    //     sorter: (a, b) => a.mobile - b.mobile,
    //   },
      {
        title: "Item Name",
        dataIndex: "product",
        sorter: (a, b) => a.product.length - b.product.length,
      },
  
      {
        title: "Category",
        dataIndex: "category",
        sorter: (a, b) => a.category.length - b.category.length,
      },
  
      {
        title: "Quantity",
        dataIndex: "qty",
        sorter: (a, b) => a.qty - b.qty,
        render: (value) => value?.toFixed(2),
      },
      {
        title: "Pending Qty.",
        dataIndex: "penQty",
        sorter: (a, b) => a.penQty - b.penQty,
        render: (value) => value?.toFixed(2),
      },
      {
        title: "Received Qty.",
        dataIndex: "recQty",
        sorter: (a, b) => a.recQty - b.recQty,
        render: (value) => value?.toFixed(2),
      },
  
      {
        title: "Uom",
        dataIndex: "uoM",
        sorter: (a, b) => a.uoM.length - b.uoM.length,
      },
      {
        title: "Price",
        dataIndex: "price",
        sorter: (a, b) => a.price - b.price,
        render: (value) => value?.toFixed(2),
      },
      {
        title: "Value",
        dataIndex: "value",
        sorter: (a, b) => a.value - b.value,
        render: (value) => value?.toFixed(2),
      },
      {
        title: "Closed Status",
        dataIndex: "closeStatus",
        sorter: (a, b) => a.closeStatus.length - b.closeStatus.length,
      },
]

export const pendingPoDetailsColumns = [
  {
    title: "Po Number",
    dataIndex: "vchNo",
    sorter: (a, b) => a.vchNo.localeCompare(b.vchNo, undefined, { numeric: true, sensitivity: 'base' }),
  },

  {
    title:"Supplier",
    dataIndex: "supplier",
    sorter: (a, b) => a.supplier.length - b.supplier.length,
  },
  {
    title:"PO Date",
    dataIndex: "date",
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
  
//   {
//     title: "Item Code",
//     dataIndex: "mobile",
//     sorter: (a, b) => a.mobile - b.mobile,
//   },
  {
    title: "Item Name",
    dataIndex: "product",
    sorter: (a, b) => a.product.length - b.product.length,
  },

  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },

  {
    title: "Quantity",
    dataIndex: "qty",
    sorter: (a, b) => a.qty - b.qty,
    render: (value) => value?.toFixed(2),
  },
  {
    title: "Pending Qty.",
    dataIndex: "penQty",
    sorter: (a, b) => a.penQty - b.penQty,
    render: (value) => value?.toFixed(2),
  },
  {
    title: "Received Qty.",
    dataIndex: "recQty",
    sorter: (a, b) => a.recQty - b.recQty,
    render: (value) => value?.toFixed(2),
  },

  {
    title: "Uom",
    dataIndex: "uoM",
    sorter: (a, b) => a.uoM.length - b.uoM.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
    render: (value) => value?.toFixed(2),
  },
  {
    title: "Value",
    dataIndex: "value",
    sorter: (a, b) => a.value - b.value,
    render: (value) => value?.toFixed(2),
  },
 
  {
    title: "Pending Value",
    dataIndex: "pendingValue",
    sorter: (a, b) => a.pendingValue - b.pendingValue,
    render: (value) => value?.toFixed(2),
  },
]

export const quotationColumns = (id) => {
  const columns = [
    {
      title: "Type",
      dataIndex: "against",
      sorter: (a, b) => a.against.length - b.against.length,
    },
    {
      title: "Quotation Number",
      dataIndex: "vchNo",
      sorter: (a, b) => a.vchNo.localeCompare(b.vchNo, undefined, { numeric: true, sensitivity: 'base' }),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      sorter: (a, b) => a.customer.length - b.customer.length,
    },
    {
      title: "Quotation Date",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Item Name",
      dataIndex: "product",
      sorter: (a, b) => a.product.length - b.product.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      sorter: (a, b) => a.qty - b.qty,
      render: (value) => value?.toFixed(2),
    },
    {
      title: "Pending Qty.",
      dataIndex: "penQty",
      sorter: (a, b) => a.penQty - b.penQty,
      render: (value) => value?.toFixed(2),
    },
    {
      title: "Received Qty.",
      dataIndex: "recQty",
      sorter: (a, b) => a.recQty - b.recQty,
      render: (value) => value?.toFixed(2),
    },
    {
      title: "Uom",
      dataIndex: "uoM",
      sorter: (a, b) => a.uoM.length - b.uoM.length,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (value) => value?.toFixed(2),
    },
    {
      title: "Value",
      dataIndex: "value",
      sorter: (a, b) => a.value - b.value,
      render: (value) => value?.toFixed(2),
    },
  ];

  // Add conditional column based on id
  if (id === "3") {
    columns.splice(12, 0, {
      title: "Closed Status",
      dataIndex: "closeStatus",
      sorter: (a, b) => a.closeStatus.length - b.closeStatus.length,
    });
  } else if (id === "4") {
    columns.splice(12, 0, {
      title: "Pending Value",
      dataIndex: "pendingValue",
      sorter: (a, b) => a.pendingValue - b.pendingValue,
      render: (value) => value?.toFixed(2),
    });
  }

  return columns;
};

export const pIColumns = (id) => {
  const columns = [
    {
      title: id === "7" ? "SI Number" : "PI Number", 
      dataIndex: "vchNo",
      sorter: (a, b) => a.vchNo.localeCompare(b.vchNo, undefined, { numeric: true, sensitivity: 'base' }),
    },
   
    {
      title: "PI Date",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
   
    {
      title: id === "7" ? "Customer" : "Supplier",
      dataIndex: "party",
      sorter: (a, b) => a.party.length - b.party.length,
    },
    {
      title: "Purchase Quantity",
      dataIndex: "purchaseQty",
      sorter: (a, b) => a.purchaseQty - b.purchaseQty,
    },
    {
      title: "Base Amount",
      dataIndex: "baseAmt",
      sorter: (a, b) => a.baseAmt - b.baseAmt,
      render: (value) => value?.toFixed(2),
    },
    {
      title: "Tax Amount",
      dataIndex: "taxAmt",
      sorter: (a, b) => a.taxAmt - b.taxAmt,
      render: (value) => value?.toFixed(2),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmt",
      sorter: (a, b) => a.totalAmt - b.totalAmt,
      render: (value) => value?.toFixed(2),
    },
  ];

  // Add conditional column based on id
  if (id === "5") {
    columns.splice(1, 0,  {
      title: "PO Number",
      dataIndex: "refVchNo",
      sorter: (a, b) => a.refVchNo.localeCompare(b.refVchNo, undefined, { numeric: true, sensitivity: 'base' }),
    });
  } 
  return columns;
};

export const partyWiseColumns = (id) => {
  const columns = [
    {
      title: "Customer",
      dataIndex: "partyName",
      sorter: (a, b) => a.partyName.length - b.partyName.length,
    },
    
    {
      title: "Total Amount",
      dataIndex: "totalAmt",
      sorter: (a, b) => a.totalAmt - b.totalAmt,
      render: (value) => value?.toFixed(2),
    },
  ];

  return columns;
};

export const stockDetailColumns = (id) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Uom",
      dataIndex: "uoM",
      sorter: (a, b) => a.uoM.length - b.uoM.length,
    },
    {
      title: "IN Quantity",
      dataIndex: "inQty",
      sorter: (a, b) => a.inQty - b.inQty,
      render: (value) => value?.toFixed(2),
    },
    {
      title: "Out Quantity",
      dataIndex: "inQty",
      sorter: (a, b) => a.outQty - b.outQty,
      render: (value) => value?.toFixed(2),
    },
    {
      title: "IN Value",
      dataIndex: "inValue",
      sorter: (a, b) => a.inValue - b.inValue,
      render: (value) => value?.toFixed(2),
    },
    {
      title: "Out Value",
      dataIndex: "outValue",
      sorter: (a, b) => a.outValue - b.outValue,
      render: (value) => value?.toFixed(2),
    },
    {
      title: "Closing Qty.",
      dataIndex: "clQty",
      sorter: (a, b) => a.clQty - b.clQty,
      render: (value) => value?.toFixed(2),
    },
  ];

  return columns;
};
export const stockBalanceColumns = (id) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Uom",
      dataIndex: "uoM",
      sorter: (a, b) => a.uoM.length - b.uoM.length,
    },
    {
      title: "Closing Qty.",
      dataIndex: "clQty",
      sorter: (a, b) => a.clQty - b.clQty,
      render: (value) => value?.toFixed(2),
    },
  ];

  return columns;
};


