const host = "http://localhost"

function parseCsrfToken(cookie: string): string|null {
    const token_urlenc = cookie.split(';')
        .map(c => {
            return [c.split('=')[0],  c.split('=')[1]];
        })
        .filter(c => c[0] === 'XSRF-TOKEN');
    if (token_urlenc.length !== 1) {
        return null;
    }
    const token =decodeURIComponent(token_urlenc[0][1]);
    return token;
}

async function getCsrfToken(): Promise<string> {
    let token = parseCsrfToken(document.cookie) 
    if(token === null){
        await fetch(host + "/sanctum/csrf-cookie", {
            credentials: 'include',
            method: 'GET',
        });
        token = parseCsrfToken(document.cookie);
        if(token === null){
            throw new Error("failed to get csrf token");
        }
    }
    return token;
}

export async function login() : Promise<boolean>
{
    let token = await getCsrfToken();
    try{
        const r = await fetch(host + "/api/login", {
            method: 'post',
            credentials: 'include',
            headers: {
                'X-XSRF-TOKEN': token,
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
        });
        const j = await r.json();
        console.log(j);
    }catch(e){
        console.error(e);
        return false;
    }
    return true;
}

export async function logout() : Promise<boolean>
{
    let token = await getCsrfToken();
    try{
        const r = await fetch(host + "/api/logout", {
            method: 'post',
            credentials: 'include',
            headers: {
                'X-XSRF-TOKEN': token,
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
        });
        const j = await r.json();
        console.log(j);
    }catch(e){
        console.error(e);
        return false;
    }
    return true;
}

export async function checkLogin() : Promise<boolean> {
    const token = await getCsrfToken();
    try{
        const r = await fetch(host + "/api/user", {
            method: 'get',
            credentials: 'include',
            headers: {
                'X-XSRF-TOKEN': token,
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
        });
        const j = await r.json();
        console.log(j);
    }catch(e){
        console.error(e);
        return false;
    }
    return true;
}

export async function requestGet(url: string): Promise<any> {
    const r = await fetch(host + url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
        },
    });
    const j = await r.json();
    return j;
}

export async function requestPost(path: string, body: any): Promise<any> {
    const token = await getCsrfToken();
    const r = await fetch(host + path, {
        method: 'post',
        credentials: 'include',
        headers: {
            'X-XSRF-TOKEN': token,
            'Content-Type': 'application/json',
            "Accept": "application/json",
        },
        body: JSON.stringify(body),
    });
    const j = await r.json();
    return j;
}

/*
export function login(){
    //todo : api呼び出し
    sessionStorage.setItem('authState', 'authenticated');
}
*/