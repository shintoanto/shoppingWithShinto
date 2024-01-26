class APIFilters {

    constructor(query, queryStr) {
        this.query = query,
            this.queryStr = queryStr
    }
    
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                // the i means case sensitive
                $options: "i",
            }
        } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filters (){
        const queryCopy = {...this.queryStr};

        const delElement = ['keyword'];
        delElement.forEach((del)=> delete queryCopy[del]);

        console.log(queryCopy);

        this.query = this.query.find(this.queryStr)
        return this;

    }
//  pagingation
    pagination (pageRes){
        const currentPage = Number(this.queryStr.page) || 1 ;

        const skip = pageRes * (currentPage - 1);

        this.query = this.query.limit(pageRes).skip(skip);
    
        return this;
    }
}

export default APIFilters;