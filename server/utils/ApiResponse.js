class  ApiResponse{

    constructor(status,msg,data,err){
        this.status = status;
        this.msg = msg;
        this.data = data;
        this.err = err;

    }
}

module.exports = ApiResponse;