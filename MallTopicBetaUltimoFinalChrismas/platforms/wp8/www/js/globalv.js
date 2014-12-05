// global app variables

	var paisId;
	var ciudadId = '9c23cbd1-56ba-46ec-98d8-a6780352f2b9';
	var ciudadNombre = "Medellin";
	var paisNombre = "Colombia";
	var latitud;
	var longitud;
	var latitudCC;
	var longitudCC;
	var direccionUsuario;
	var nombreCC='';
	var idCategoria='';
	var IndexControl = 0;

	var dato='';
	var dato2='';
	var dato3='';
	var Idnum='';
	var Idcc='';
	var idlocal='';
	var objectStore;
	var objectCC;
	var Nivel;
	var Celda;
	var Color;
	var Promocion;
	var Evento;
	var Coleccion;
	var Galeria;
	var Movie;
	var FiltroMalls;
	var FiltroPromos;
	var CargarDetCine;
	var MasCercanos;
	var MallCine;

	function setMallCine (PMallCine) {
		MallCine = PMallCine;
	}

	function getMallCine() {
		return MallCine;
	}

	function setMasCercanos (PMasCercanos) {
		MasCercanos = PMasCercanos;
	}

	function getMasCercanos() {
		return MasCercanos;
	}

	function setCargarDetCine (PCargarDetCine) {
		CargarDetCine = PCargarDetCine;
	}

	function getCargarDetCine() {
		return CargarDetCine;
	}

	function setFiltroPromos (PFPromos) {
		FiltroPromos = PFPromos;
	}

	function getFiltroPromos () {
		return FiltroPromos;
	}

	function setFiltroMalls(PFMalls) {
		FiltroMalls = PFMalls;
	}

	function getFiltroMalls() {
		return FiltroMalls;
	}

	function setMovie (PMovie) {
		Movie = PMovie;
	}

	function getMovie () {
		return Movie;
	}

	function setGaleria (PGaleria) {
		Galeria = PGaleria;
	}

	function getGaleria () {
		return Galeria;
	}

	function setColeccion(PColeccion){
		Coleccion = PColeccion;
	}

	function getColeccion () {
		return Coleccion;
	}

	function setEvento(PEvento){
		Evento = PEvento;
	}

	function getEvento(){
		return Evento;
	}

	function setPromo(PPromo){
		Promocion = PPromo;
	}

	function getPromo(){
		return Promocion;
	}

	function setNivel(PNivel){
		Nivel = PNivel;
	}

	function getNivel(){
		return Nivel;
	}

	function setCelda(PCelda){
		Celda = PCelda;
	}

	function getCelda(){
		return Celda;
	}

	function setColor(PColor){
		Color = PColor;
	}

	function getColor(){
		return Color;
	}

	function setIndexControl(icontrol){
		IndexControl = icontrol;
	}

	function getIndexControl(){
		return IndexControl;
	}


	function setCate(idcate)
	{
		idCategoria = idcate;
	}

	function getCate()
	{
		return idCategoria;
	}

	function setObjectStore(item){
		objectStore=item;
		}
	function getObjectStore(){
		return objectStore;
		}
	
	function setObjectCC(cc){
		objectCC=cc;
		}
	function getObjectCC(){
		return objectCC;
		}
	function setLatitud(lat){
		latitud=lat;
		}
	function getLatitud(){
		return latitud;
		}
	function setLongitud(long){
		longitud=long;
		}

	function getLongitud(){
		return longitud;
		}
	function setLatitudCC(lat){
		latitudCC=lat;
	}
	function setLongitudCC(long){
		longitudCC=long;
	}
	function setCCNombre(nom){
		nombreCC=nom;
	}
	function getCCNombre(){
		return nombreCC;
	}
	function getLatitudCC() {
			return latitudCC;
		}
	function getLongitudCC() {
			return longitudCC;
		}
	function getPais() {
			return paisId;
		}

	function getCiudad() {
			return ciudadId;
		}
	function getCiudadNombre() {
			return ciudadNombre;
		}
	function getPaisNombre() {
			return paisNombre;
		}
	function getDireccionUsuario() {
			return direccionUsuario;
		}
	
	function setPais(pais) {
			paisId=pais;
		}

	function setCiudad(ciudad) {
			ciudadId=ciudad;
		}
		
		
	function setCC(item) {
			Idcc=item;
		}

	function setDato(item) {
			dato=item;
		}

	function setId(item) {
			Idnum=item;
		}
	function setDato2(item) {
			dato2=item;
		}
	function setDato3(item) {
			dato3=item;
		}

	function getCC() {
			return Idcc;
		}

	function getDato() {
			return dato;
		}

	function getDato2() {
			return dato2;
		}

	function getDato3() {
			return dato3;
		}

	function getDatoId() {
			return Idnum;
		}

	function SetLocal(idloc){
			idlocal=idloc;
		}

	function GetLocal(){
		return idlocal;
	}

	window.getCiudadNombre=getCiudadNombre;	
	window.getPaisNombre=getPaisNombre;	
	window.getPais=getPais;
	window.getCiudad=getCiudad;
	window.setPais=setPais;
	window.setCiudad=setCiudad;
	window.setLongitud=setLongitud;
	window.setLatitud=setLatitud;
	window.getLongitud=getLongitud;
	window.getLatitud=getLatitud;
	window.setLongitudCC=setLongitudCC;
	window.setLatitudCC=setLatitudCC;
	window.getLongitudCC=getLongitudCC;
	window.getLatitudCC=getLatitudCC;
	window.setCCNombre=setCCNombre;
	window.getCCNombre=getCCNombre;	
	window.getObjectCC=getObjectCC;
	window.setObjectCC=setObjectCC;

    window.setDato2=setDato2;
	window.setId=setId;		
	window.getCC=getCC;
	window.getDato=getDato;
	window.getDato2=getDato2;
	window.getDato3=getDato3;
	window.getDatoId=getDatoId;	   	
	window.setCC=setCC;
	window.setDato=setDato;
	window.setObjectStore=window.setObjectStore;
	window.getObjectStore=window.getObjectStore;
	window.setCate = setCate;
	window.getCate = getCate;
	window.setIndexControl = setIndexControl;
	window.getIndexControl = getIndexControl;
	window.SetLocal = SetLocal;
	window.GetLocal = GetLocal;
	window.setNivel = setNivel;
	window.getNivel = getNivel;
	window.setCelda = setCelda;
	window.getCelda = getCelda;
	window.setColor = setColor;
	window.getColor = getColor;
	window.setPromo = setPromo;
	window.getPromo = getPromo;
	window.setColeccion = setColeccion;
	window.getColeccion = getColeccion;
	window.setGaleria = setGaleria;
	window.getGaleria = getGaleria;
	window.setMovie = setMovie;
	window.getMovie = getMovie;
	window.setFiltroMalls = setFiltroMalls;
	window.getFiltroMalls = getFiltroMalls;
	window.setFiltroPromos = setFiltroPromos;
	window.getFiltroPromos = getFiltroPromos;
	window.setCargarDetCine = setCargarDetCine;
	window.getCargarDetCine = getCargarDetCine;
	window.setMasCercanos = setMasCercanos;
	window.getMasCercanos = getMasCercanos;
	window.setMallCine = setMallCine;
	window.getMallCine = getMallCine;