// Generic filtration, pagination, and sorting endpoint
const genericFeatures = (requestQuery, table, fields) => {
    let { page, size = 5, sort, order, ...filters } = requestQuery;

    size = (parseInt(size))
    page = parseInt(page) || 1;
    limit = size || 5;
    const offset = (page - 1) * size;
    order = order || 'ASC';

    let query = `SELECT ${fields} FROM ${table} `;
    let whereClauses = [];
    let queryParams = [];


    /**
     * Filtration
     * seperate filter name from the values
     * filters => {name:"test", "categoty:"fruit"}
     * whereCauses will be =>  [category = ? , name = ? ]
     * so that i can replace ? with the values of each filter
     * where i can use filters.name will be test
     * so that queryParams will hold the values
     * which will replace ? in the whereClauses
     */
    Object.keys(filters).forEach(filter => {
        whereClauses.push(`${filter} = ?`);
        queryParams.push(filters[filter]);
    });

    /**
     * join all where clauses with the each other
     * with AND as a sperator 
     * and make sure to retrive values which isn't deleted 
     */
    if (whereClauses.length > 0) {
        query += ' WHERE ' + whereClauses.join(' AND ');
        query += " AND isDeleted = false "
    }


    /**
     * if there is no filteration of the data
     * retrive only not deleted data
     */
    else
        query += " WHERE isDeleted = false "


    // Sorting
    if (sort) {
        query += ` ORDER BY ${sort} ${order}`;
    }
    // Pagination
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(size, offset);
    return { query, queryParams }
}


module.exports = genericFeatures;

