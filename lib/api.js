export const getMenuItems = async (userdata) => {


    const res = await fetch(`${process.env.API}pos/getmenutypes/${userdata.time}/${userdata.memberid}`);
    const menus = await res.json();

    return menus;
}

export const getPost = async (slug) => {

    const res = await fetch(`${process.env.API}category/${slug}`);
    const post = await res.json();

    return post;
}