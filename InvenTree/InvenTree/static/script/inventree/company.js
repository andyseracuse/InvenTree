
function loadCompanyTable(table, url, options={}) {
    /*
     * Load company listing data into specified table.
     *
     * Args:
     * - table: Table element on the page
     * - url: Base URL for the API query
     * - options: table options.
     */

    // Query parameters
    var params = options.params || {};

    var filters = loadTableFilters("company");

    for (var key in params) {
        filters[key] = params[key];
    }

    setupFilterList("company", $(table));

    $(table).inventreeTable({
        url: url,
        method: 'get',
        queryParams: filters,
        groupBy: false,
        formatNoMatches: function() { return "No company information found"; },
        columns: [
            {
                field: 'pk',
                title: 'ID',
                visible: false,
            },
            {
                field: 'name',
                title: 'Company',
                sortable: true,
                formatter: function(value, row, index, field) {
                    var html = imageHoverIcon(row.image) + renderLink(value, row.url);

                    if (row.is_customer) {
                        html += `<span title='Customer' class='fas fa-user-tie label-right'></span>`;
                    }
                    
                    if (row.is_manufacturer) {
                        html += `<span title='Manufacturer' class='fas fa-industry label-right'></span>`;
                    }
                    
                    if (row.is_supplier) {
                        html += `<span title='Supplier' class='fas fa-building label-right'></span>`;
                    }

                    return html;
                }
            },
            {
                field: 'description',
                title: 'Description',
                sortable: true,
            },
            {
                field: 'website',
                title: 'Website',
                formatter: function(value, row, index, field) {
                    if (value) {
                        return renderLink(value, value);
                    }
                    return '';
                }
            },
        ],
    });
}


function loadSupplierPartTable(table, url, options) {
    /*
     * Load supplier part table
     *
     */

    // Query parameters
    var params = options.params || {};

    // Load 'user' filters
    var filters = loadTableFilters("supplier-part");

    for (var key in params) {
        filters[key] = params[key];
    }

    setupFilterList("supplier-part", $(table));

    $(table).inventreeTable({
        url: url,
        method: 'get',
        queryParams: filters,
        groupBy: false,
        formatNoMatches: function() { return "No supplier parts found"; },
        columns: [
            {
                checkbox: true,
            },
            {
                sortable: true,
                field: 'part_detail.full_name',
                title: 'Part',
                formatter: function(value, row, index, field) {

                    var url = `/part/${row.part}/`;

                    var html = imageHoverIcon(row.part_detail.thumbnail) + renderLink(value, url);

                    if (row.part_detail.is_template) {
                        html += `<span class='fas fa-clone label-right' title='Template part'></span>`;
                    }

                    if (row.part_detail.assembly) {
                        html += `<span class='fas fa-tools label-right' title='Assembled part'></span>`;
                    }

                    if (!row.part_detail.active) {
                        html += `<span class='label label-warning label-right'>INACTIVE</span>`;
                    }

                    return html;
                }
            },
            {
                sortable: true,
                field: 'supplier',
                title: "Supplier",
                formatter: function(value, row, index, field) {
                    if (value) {
                        var name = row.supplier_detail.name;
                        var url = `/company/${value}/`; 
                        var html = imageHoverIcon(row.supplier_detail.image) + renderLink(name, url);

                        return html;
                    } else {
                        return "-";
                    }
                },
            },
            {
                sortable: true,
                field: 'SKU',
                title: "Supplier Part",
                formatter: function(value, row, index, field) {
                    return renderLink(value, row.url);
                }
            },
            {
                sortable: true,
                field: 'manufacturer',
                title: 'Manufacturer',
                formatter: function(value, row, index, field) {
                    if (value) {
                        var name = row.manufacturer_detail.name;
                        var url = `/company/${value}/`;
                        var html = imageHoverIcon(row.manufacturer_detail.image) + renderLink(name, url);

                        return html;
                    } else {
                        return "-";
                    }
                }
            },
            {
                sortable: true,
                field: 'MPN',
                title: 'MPN',
            },
            {
                field: 'link',
                title: 'Link',
                formatter: function(value, row, index, field) {
                    if (value) {
                        return renderLink(value, value);
                    } else {
                        return '';
                    }
                }
            },
        ],
    });
}