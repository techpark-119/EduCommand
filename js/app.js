const RequestParser= (req) => {
    text = 'users?active=no';
    const result = text.split('?')
}

const GetHomepage =(req, res) => {
    res.end('Homepge Data');
}

const GetUsersPage = (req,res) => {
    res.end('Users Data');
}

obj = {
    'GET' : {
        '/' : GetHomepage,
        '/users' : GetUsersPage,
    },
    'PUT' : {
        '/' : GetHomepage,
        '/users' : GetUsersPage,
    },
    'POST' : {
        '/' : GetHomepage,
        '/users' : GetUsersPage,
    },
    'DELETE' : {
        '/' : GetHomepage,
        '/users' : GetUsersPage,
    },
}

app.get['/'],['GET']
const requestHandler = (req, res)=> {
    RequestParser(req);

    const route = obj[request.method],[req.path];
     route =                                                                                                                                                                            obj.GET
    if(req.path=='/' && method == 'GET'){
        console.log('This is a GET method');
        return GetHomepage(req, res);
    }
    if(req.path == '/' && method == 'POST') {
        console.log('This is a POST method');
        return res.end();
    }
    if(req.path == '/' && method == 'PUT') {
        console.log('This is a PUT method');
        return res.end();
    }
    if(req.path == '/' && method == 'DELETE') {
        console.log('This is a DELETE method');
        return res.end();
    }
    res.end('PAGE NOT FOUND!')
}
requestHandler();

const app =http.createServer(requestHandler);

const PORT = 3000;

app.listen{PORT, (3000) => {
    console.log('Server listening at Port', PORT);
}}