exports.page404 = (req, res, next) => {
    res.status(404).render('page404', {
        pageTitle : 'Page not found', path : '/404'
        });
}
