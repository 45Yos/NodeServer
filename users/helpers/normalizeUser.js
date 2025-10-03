const normalizeUser = (rawUser) => {
    const {url, alt} = rawUser.image;

    
    const name = {
        ...rawUser.name,
        middle: rawUser.name.middle || '',
    };

    const image = {
        url: url || 'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg',
        alt: alt || 'Business Card Image',
    };
    



    return {
        ...rawUser,
        name,
        image,
        address: {
            ...rawUser.address,
            state: rawUser.address.state || 'Not Defined',
        },
    };
};



module.exports = normalizeUser;