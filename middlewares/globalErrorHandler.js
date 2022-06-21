exports.errorMiddleware = (error, req, res) => {
    console.log(`aa`);
    res.render('404', {status: error.status, message: error.message})
}