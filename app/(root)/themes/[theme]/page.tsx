const ThemePage = ({params}: {params: {theme: string}}) => {
    const decodedTheme = decodeURIComponent(params.theme)
    return ( 
        <div>
            {decodedTheme}
        </div>
     );
}
 
export default ThemePage;