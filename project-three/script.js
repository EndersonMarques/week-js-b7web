document.querySelector('.busca').addEventListener('submit',async (evento)=>{
    evento.preventDefault();

    let input = document.querySelector('#searchInput').value;
    if(input !== ''){
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=f0a3bc13a5bd473e40015245b3a2e981&units=metric&lang=pt_br`
        let results = await fetch(url);
        let json = await results.json();
        
        if(json.cod === 200){
            showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            temIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não foi encontrado este local')
        }
    }
});
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}
function showInfo(json){
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = json.name + ', ' + json.country;
    document.querySelector('.tempInfo').innerHTML = ` ${json.temp} <sup> ºC </sup> `;
    document.querySelector('.ventoInfo').innerHTML = ` ${json.windSpeed} <span> km/h </span> `

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.temIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle- 90}deg)`

}
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}