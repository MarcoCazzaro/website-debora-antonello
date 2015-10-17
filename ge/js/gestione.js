var URLBase = "/";
var ritardoIniziale = 1000;
var durataSingoloSfondo = 8000;
var durataFade = 3000;
var altezzaElementoSezione = 0;
var altezzaArticolo = 0;
var ultimaSezioneInserita = "";
var etichettaUltimaSezioneInserita = "";
var oggettoTimer;
var semilato = 0;
var leftImmagine = 0;
var widthImmagine = 0;
var widthOri = 0;
var topImmagine = 0;
var heightImmagine = 0;
var heightOri = 0;
var lenteVisualizzata = 0;

function preload(priorita, idimmagine) {
	var nomePreloadN = "";
	var richiesta = "";
	if ($("#IDdivpreload").length == 0)
	{
		var divpreload;
		divpreload = $('<div id=\"IDdivpreload\"></div>').css('display', 'none');
		$("body").append(divpreload);
	}
	if (idimmagine == "")
	{
		nomePreloadN = "IDdivpreload" + priorita;
		richiesta = URLBase + "ge/js/preloader.php?priorita="+priorita+" div";
	}
	else
	{
		nomePreloadN = "IDdivpreload" + idimmagine;
		richiesta = URLBase + "ge/js/preloader.php?idimmagine="+idimmagine+" div";
	}
	var preloadN = $('<div id=\"' + nomePreloadN + '\"></div>');
	$("#IDdivpreload").append(preloadN);	
	$("#" + nomePreloadN).load( richiesta, function( response, status, xhr ) {
		if ( status == "error" ) {
			var msg = "Sorry but there was an error: ";
			alert( msg + xhr.status + " " + xhr.statusText );
		}
	});
}

function animazioneTestataIndex() {
	var intRitardoAnimazione = 2000;
	var intDurataEffetto = 1000;
	var intRitardoPulsanti = 0;
	
	$("#IDfasciatestata").delay(intRitardoAnimazione).removeClass("CLStestataindexiniziale", intDurataEffetto);
	$(".CLSscrittatestata").delay(intRitardoAnimazione).removeClass("CLSscrittatestatainiziale", intDurataEffetto);
	intRitardoPulsanti = intRitardoAnimazione + intDurataEffetto + 300;
	$(".CLSpulsantemenu").each(function() {
		$(this).delay(intRitardoPulsanti).show("slide", {duration: 300, direction:"down"});
		intRitardoPulsanti += 200;
	  });
	$(".CLScontenitoresegnapostosfondi").delay(intRitardoAnimazione).show("fade", intDurataEffetto);
}

function animazioneFooterIndex() {
	var intRitardoAnimazione = 2000;
	$("#IDpulsanteNow").delay(intRitardoAnimazione).show("fade", {duration: 1000, easing: 'easeOutExpo'});
}

function animazioneTestataWorks() {
	var intRitardoAnimazione = 300;
	var intDurataEffetto = 1000;
	
	$(".CLSsfondotestata").delay(intRitardoAnimazione).addClass("CLSsfondotestatacontrasto", {duration: intDurataEffetto, easing: "swing"});
	$(".CLSsfondoworks").show("fade", {duration: intDurataEffetto, easing: "easeInExpo"});
	$("#IDpulsanteWorks").delay(intRitardoAnimazione).parent().addClass("CLSmenuattivo", {duration: intDurataEffetto, easing: "swing"});
}

function animazioneWorksSezioni() {
	var intRitardoPulsanti = 0;

	$( "#IDcontenitoresezioni" ).load( "sezioni.php li", function( response, status, xhr ) {
		if ( status == "error" ) {
			var msg = "Sorry but there was an error: ";
			alert($(this) + "###" + msg + xhr.status + " " + xhr.statusText );
		}
		else
		{
			$(".CLSworkssezione").each(function() {
				$(this).delay(intRitardoPulsanti).show("fade", {duration: 500, direction:"up", easing: "easeOutExpo"});
				intRitardoPulsanti += 300;
			});
			var paddingSezione = $(".CLSworkssezione").css("padding").replace("px", "");
			var altezzasezioni = ($(".CLSworkssezione").height() + paddingSezione * 2) * $(".CLSworkssezione").length;
			$(".CLSsfondocontenitoresezioni").css("height", altezzasezioni);
		}
	});
}

function animazioneTestataBio() {
	var intRitardoAnimazione = 300;
	var intDurataEffetto = 1000;
	
	$(".CLSsfondotestata").delay(intRitardoAnimazione).addClass("CLSsfondotestatacontrasto", {duration: intDurataEffetto, easing: "swing"});
	$(".CLScontenitoresezioni").css("top", $("#IDfasciatestata").height());
	$(".CLSsfondobio").show("fade", {duration: intDurataEffetto, easing: "easeInExpo"});
	$("#IDpulsanteBio").delay(intRitardoAnimazione).parent().addClass("CLSmenuattivo", {duration: intDurataEffetto, easing: "swing"});
}

function animazioneFooterBio() {
	$("#IDpulsanteDeb").show("fade", {duration: 1000, complete: function(){
			visualizzaBio();
		}
	});
}

function animazioneTestataGallery() {
	var intRitardoAnimazione = 300;
	var intDurataEffetto = 1000;
	
	$(".CLSsfondotestata").delay(intRitardoAnimazione).addClass("CLSsfondotestatacontrasto", {duration: intDurataEffetto, easing: "swing"});
	$(".CLSsfondogallery").show("fade", {duration: intDurataEffetto, easing: "easeInExpo"});
	$("#IDpulsanteGallery").delay(intRitardoAnimazione).parent().addClass("CLSmenuattivo", {duration: intDurataEffetto, easing: "swing"});
}

function animazioneTestataContact() {
	var intRitardoAnimazione = 300;
	var intDurataEffetto = 1000;
	
	$(".CLSsfondotestata").delay(intRitardoAnimazione).addClass("CLSsfondotestatacontrasto", {duration: intDurataEffetto, easing: "swing"});
	$(".CLSsfondocontact").show("fade", {duration: intDurataEffetto, easing: "easeInExpo"});
	$(".CLSsezionecontatti").show("fade", {duration: intDurataEffetto*2, easing: "easeInExpo"});
	$("#IDpulsanteContact").delay(intRitardoAnimazione).parent().addClass("CLSmenuattivo", {duration: intDurataEffetto, easing: "swing"});
}

function animazioneTestataSlideshow() {
	var intRitardoAnimazione = 500;
	var intDurataEffetto = 300;
	
	$(".CLSslideshowdettagliarticolo").delay(intRitardoAnimazione).show("slide", {duration:intDurataEffetto, direction:"up", complete: function(){ $(".CLSslideshowdettagliarticolo").removeClass("CLSdisplaynone"); }});
	$("body").append('<div id=\"IDslideshowtitolosezionemenu\" class=\"CLSslideshowtitolosezionemenu CLSdisplaynone\"></div>');
	$( "#IDslideshowtitolosezionemenu" ).load( "../sezioni.php?modo=menu li", function( response, status, xhr ) {
		if ( status == "error" ) {
			var msg = "Sorry but there was an error: ";
			alert($(this) + "###" + msg + xhr.status + " " + xhr.statusText );
		}
		else
		{
			if ($("#IDimmagineprecedente").length == 0)
			{
				$(".CLSslideshowtitolosezionemenu").delay(500).show("fade", 1000);
				$(".CLSslideshowtitolosezionemenu").delay(1500).hide("fade", 3000);
			}
		}
	});
}
function ridimensionaImmagineSlideshow(){
	var altezzaFasciaMenu = $(".CLSslideshowdettagliarticolo").height() + $(".CLStestata").height();
	var larghezzaOri = $("img.CLSslideshowimmaginecaricata").width();
	var altezzaOri = $("img.CLSslideshowimmaginecaricata").height();
	var proporzione = larghezzaOri / altezzaOri;
	var larghezzaNuova = 0;
	if ($(window).height() < $(window).width())
	{
		larghezzaNuova = ($(window).height() - altezzaFasciaMenu) * proporzione;
		$("img.CLSslideshowimmaginecaricata").attr("width", larghezzaNuova);
		$("img.CLSslideshowimmaginecaricata").attr("height", $(window).height() - altezzaFasciaMenu);
		$(".CLSslideshowcontenitoreimmaginecaricata").css("top", altezzaFasciaMenu);
		$(".CLSslideshowcontenitoreimmaginecaricata").css("left", ($(window).width() / 2) - (larghezzaNuova / 2));
	}
	else
	{
		larghezzaNuova = $(window).width();
		$("img.CLSslideshowimmaginecaricata").attr("width", larghezzaNuova);
		$("img.CLSslideshowimmaginecaricata").attr("height", larghezzaNuova / proporzione);
		$(".CLSslideshowcontenitoreimmaginecaricata").css("top", altezzaFasciaMenu);
		$(".CLSslideshowcontenitoreimmaginecaricata").css("left", 0);
	}
}

function scrollPagina(intScroll)
{
	//$("body, html").scrollTop(intScroll);
	$(window).scrollTop(intScroll);
}

function visualizzaImmagineNews(contenitoreNews)
{
	contenitoreNews.find(".CLSimmaginenewsnascosta").delay(500).show("fade", {duration: 2000, easing:"swing", complete: function() {
				contenitoreNews.find(".CLSimmaginenewsnascosta").removeClass("CLSimmaginenewsnascosta");
			}
		} );
}

function visualizzaBio()
{
	if ($(".CLSbioelenco").length == 0)
	{
		$("#IDmiofooter").append("<div id=\"IDbioelenco\" class=\"CLSbioelenco\"></div>");				
		$( "#IDbioelenco" ).load( "bioelenco.php section", function( response, status, xhr ) {
		  if ( status == "error" ) {
			var msg = "Sorry but there was an error: ";
			alert($(this) + "###" + msg + xhr.status + " " + xhr.statusText );
		  }
		  else {
			$("body, html").delay(300).animate({
				"scrollTop": "100px"
			  }, {duration: 1000, easing: "easeOutExpo"} );
		  }
		});
	}
}

function preloadImmaginiAdiacenti()
{
	var idImmagineSuccessiva = "";
	var idImmaginePrecedente = "";
	
	if ($(".CLSslideshowfrecciadx").length > 0)
	{
		idImmagineSuccessiva = $(".CLSslideshowfrecciadx a").attr("destinazione");
	}
	if ($(".CLSslideshowfrecciasx").length > 0)
	{
		idImmaginePrecedente = $(".CLSslideshowfrecciasx a").attr("destinazione");
	}
	if (idImmagineSuccessiva !== "")
	{
		preload(-1, idImmagineSuccessiva);
	}
	if (idImmaginePrecedente !== "")
	{
		preload(-1, idImmaginePrecedente);
	}
}

function impostaLinguaCorrente(lingua) {
	var stringaLingua = "";
	if (lingua !== "") 
	{
		stringaLingua = "?lingua=" + lingua + " ";
	}
	$("#IDinfolingua").remove();
	$("#IDfittizio").append("<div id=\"IDinfolingua\"></div>");	
	$( "#IDinfolingua" ).load( URLBase + "ge/js/impostalinguacorrente.php" + stringaLingua + " div", function( response, status, xhr ) {
	  if ( status == "error" ) {
		var msg = "Sorry but there was an error: ";
		alert($(this) + "###" + msg + xhr.status + " " + xhr.statusText );
	  }
	  else
	  {
		var linguaCorrente = $("#IDlingua").text();
		$(".CLSlingua" + linguaCorrente).addClass("CLSlinguaattiva");
	  }
	});
}

$(function() {
	$(window).load(		
		function() {
			if ($("#IDindex").length > 0)
			{
				preload(1, "");
				preload(2, "");
				animazioneTestataIndex();
				animazioneFooterIndex();
				$('#IDsfondo2').after(					
					'<div id="IDsfondo3" class="CLSdivsfondo CLSsfondo3"></div>' +
					'<div id="IDsfondo4" class="CLSdivsfondo CLSsfondo4"></div>' +
					'<div id="IDsfondo5" class="CLSdivsfondo CLSsfondo5"></div>' +
					'<div id="IDsfondo6" class="CLSdivsfondo CLSsfondo6"></div>' +
					'<div id="IDsfondo7" class="CLSdivsfondo CLSsfondo7"></div>' +
					'<div id="IDsfondo8" class="CLSdivsfondo CLSsfondo8"></div>' 
					);			
				$("#IDsfondi").SlideshowSfondo({
					timeOut: durataSingoloSfondo
				});				
			}
			else if ($("#IDworks").length > 0)
			{	
				animazioneTestataWorks();
				animazioneWorksSezioni();
			}
			else if ($("#IDbio").length > 0)
			{
				animazioneTestataBio();
				animazioneFooterBio();
			}
			else if ($("#IDgallery").length > 0)
			{
				animazioneTestataGallery();
			}
			else if ($("#IDcontact").length > 0)
			{
				animazioneTestataContact();
			}
			else if ($("#IDslideshow").length > 0)
			{
				animazioneTestataSlideshow();
			}
			$(".CLSsezioneinallestimento").show("fade", 5000);
		}
	);
	$(document).ready(		
		function() {
			if (location.hostname == 'localhost') 
			{
				$(".CLSvisualizzatorestatistiche").remove();
				URLBase = "/Deb/";
			}
			altezzaElementoSezione = $(".CLSworkssezione").height();
			altezzaArticolo = $(".CLSarticolosezione").height();
			if ($("#IDindex").length > 0)
			{
				impostaLinguaCorrente("");
			}
			else if ($("#IDworks").length > 0)
			{
				
			}
			else if ($("#IDbio").length > 0)
			{
				
			}
			else if ($("#IDgallery").length > 0)
			{
				
			}
			else if ($("#IDcontact").length > 0)
			{
				
			}
			else if ($("#IDslideshow").length > 0)
			{
				$(".CLSslideshowcaricamento").show();
				//*************************
			}
		}
	);
	$("#IDpulsanteNow").click(
		function() {
			if ($(".CLSnews").length == 0)
			{
				$("#IDmiofooter").append("<div id=\"IDnews\" class=\"CLSnews\"></div>");				
				$( "#IDnews" ).load( "news/index.php section", function( response, status, xhr ) {
				  if ( status == "error" ) {
					var msg = "Sorry but there was an error: ";
					alert($(this) + "###" + msg + xhr.status + " " + xhr.statusText );
				  }
				  else
				  {
					clearInterval(oggettoTimer);
					$(".CLSfooteradesso").addClass("CLSfooteradessoscuro", 1000);
					$("body, html").animate({
							"scrollTop": "300px"
						}, {duration: 1000, easing: "easeOutExpo", complete: function(){
							$(".CLSdivsfondo").hide("fade", {duration: 1700, easing:"swing"});
							$(".CLStitolooperasfondo").hide("fade", {duration: 300, easing:"swing"} );
							$(".CLScontenitoresegnapostosfondi").hide("fade", {duration: 300, easing:"swing"} );
						}
					} );					
				  }
				});
			}
		}
	);	
	$("#IDpulsanteDeb").click(
		function() {
			visualizzaBio();
		}
	);
	$("body").on("click","#IDhome", function() {
		location.assign(URLBase);
	});
	$("body").on("click","#IDpulsanteWorks", function() {
		location.assign(URLBase + "works/");
	});
	$("body").on("click","#IDpulsanteBio", function() {
		location.assign(URLBase + "bio/");
	});
	$("body").on("click","#IDpulsanteContact", function() {
		location.assign(URLBase + "contact/");
	});
	$("body").on("click","#IDpulsanteGallery", function() {
		location.assign(URLBase + "gallery/");
	});
	$("body").on("mouseenter",".CLSpulsantemenu", function() {
		$(this).toggleClass("CLSmenumouseenter", 300);
	});
	$("body").on("mouseleave",".CLSpulsantemenu", function() {
		$(this).toggleClass("CLSmenumouseenter", 300);
	});
	$("#IDcontenitoresezioni").on("mouseenter",".CLSworkslinksezione", function() {		
		$(this).parent().children(".CLSworkssezionequadrato").addClass("CLSworkssezionequadratopieno", 250);
		$(this).parent().children(".CLSworkssezionequadrato").addClass("CLSworkssezionequadratopienobordo", 300);
	});
	$("#IDcontenitoresezioni").on("mouseleave",".CLSworkslinksezione", function() {
		$(this).parent().children(".CLSworkssezionequadrato").removeClass("CLSworkssezionequadratopienobordo", 550);
		$(this).parent().children(".CLSworkssezionequadrato").removeClass("CLSworkssezionequadratopieno", 600);		
	});
	$("#IDcontenitoresezioni").on("click",".CLSworkslinksezione", function() {
		var durata = 300;
		var ritardo = 300;
		var intRitardoAttuale = 0;
		var elementiChiusi = $(this).parent().index();
		var genitore = $("#IDsezione").parent();
		var temp = "";
		var altezzaSezione = 0;
		var sezioneChiamante = $(this).parent();

		if (!$("#IDcontenitoresezioni").hasClass("CLScontenitoresezioniampio"))
		{
			$(".CLSsfondocontenitoresezioni").delay(ritardo).hide("fade", durata);
			$("#IDcontenitoresezioni").addClass("CLScontenitoresezioniampio", {duration: durata, easing: "swing", complete: function(){ritardo = 0;} });
			$("#IDcontenitoresezioni").addClass("CLScontenitoresezionimouseenter", 300);
		}
		if (!sezioneChiamante.hasClass("CLSworkssezioneampio"))
		{
			if (ultimaSezioneInserita != "")
			{
				temp = "#" + ultimaSezioneInserita;
				$(temp).hide("fade", {duration: durata});
				$(temp).parent().animate({
						height: altezzaElementoSezione
					}, {duration: durata, easing:"swing", complete: function() {
							$(temp).parent().removeClass("CLSworkssezioneampio");
							sezioneChiamante.addClass("CLSworkssezioneampio");
							$(temp).remove();
						}
					} );
			}
			else
			{
				sezioneChiamante.addClass("CLSworkssezioneampio");
			}
			ultimaSezioneInserita = "IDsez_" + $(this).attr("id");
			etichettaUltimaSezioneInserita = $(this).text();
			sezioneChiamante.append("<div id=\"" + ultimaSezioneInserita + "\" class=\"CLSsezione\"></div>");
			$("#" + ultimaSezioneInserita).load( "articoli.php?sezione=" + $(this).attr("id") + " #" + $(this).attr("id"), function( response, status, xhr ) {
				if ( status == "error" ) {
					var msg = "Sorry but there was an error: ";
					alert($(this) + "###" + msg + xhr.status + " " + xhr.statusText );
				}
				else
				{
					scrollPagina(elementiChiusi * (altezzaElementoSezione + 50));
					ritardo = 200;
					altezzaSezione = 0;
					sezioneChiamante.find(".CLSarticolosezione").each(function() {
						altezzaSezione += $(this).height();
						var immagine = $(this).find(".CLSimmaginesezione");
						immagine.css("background", "transparent url('../ge/images/works/small/" + $(this).attr("percorso") + "') no-repeat center center");
						immagine.css("background-size", "cover");
						$(this).delay(ritardo).show("fade", {duration: durata, complete: function(){$(this).removeClass("CLSdisplaynone");}  });
						ritardo += 100;
					  });
					sezioneChiamante.animate({
						height: altezzaSezione
					}, {duration: durata, easing:"swing"} );
				}
			});
		}
	});
	$("#IDcontenitoresezioni").on("click",".CLSlinkimmaginesezione", function() {
		var strIDImmagine = $(this).parent().parent().parent().attr("id");
		var strIDSezione = $(this).parent().parent().parent().parent().attr("id");
		location.assign(URLBase + "works/slideshow/?sezione=" + strIDSezione + "&immagine=" + strIDImmagine);
	});
	$(".CLSslideshowfreccia").on("click","a", function() {
		var strIDImmagine = $(this).attr("destinazione");
		var strIDSezione = $(this).attr("sezione");
		var direzione = "left";
		if ($(this).text() == "<")
		{
			direzione = "right";
		}
		$(".CLSslideshowtitolosezionemenu").hide();
		$(".CLSslideshowdettagliarticolo").hide("slide", {duration:300, direction:"up"});
		$(".CLSslideshowcontenitoreimmaginecaricata").hide("drop", {duration: 300, direction: direzione, complete: function(){
				location.assign(URLBase + "works/slideshow/?sezione=" + strIDSezione + "&immagine=" + strIDImmagine);
			}  });
	});
	$("body").on("mouseenter",".CLSslideshowfreccia", function() {
		$(this).addClass("CLSfrecciamouseenter", 300);
	});
	$("body").on("mouseleave",".CLSslideshowfreccia", function() {
		$(this).removeClass("CLSfrecciamouseenter", 200);
	});
	$(".CLSslideshowdettagliarticolo").on("mouseenter",".CLSslideshowtitolosezione", function() {
		$(".CLSslideshowtitolosezionemenu").show("fade", {duration: 500});
	});
	$("body").on("mouseleave",".CLSslideshowtitolosezionemenu", function() {
		$(this).hide("fade", {duration: 500});
	});
	$("body").on("click",".CLSworkslinksezionemenu", function() {
		var strIDSezione = $(this).attr("id");
		location.assign(URLBase + "works/slideshow/?sezione=" + strIDSezione);
	});
	$("body").on("mouseenter",".CLSworkslinksezionemenu", function() {
		$(this).parent().addClass("CLSworkssezionemenumouseenter", 300);
	});
	$("body").on("mouseleave",".CLSworkslinksezionemenu", function() {
		$(this).parent().removeClass("CLSworkssezionemenumouseenter", 300);
	});	
	$("html").on("mousemove","body", function() {
		if (lenteVisualizzata == 1)
		{
			var X = event.pageX;
			var Y = event.pageY;
			if (X < semilato)
			{
				X = semilato;
			}
			if (X > $(window).width() - semilato)
			{
				X = $(window).width() - semilato;
			}
			$(".CLSlenteingrandimento").css("left", X - semilato);
			$("img.CLSimmaginelente").css("left", ((leftImmagine - event.pageX) * (widthOri / widthImmagine) ) + semilato);
			if (Y < 100 + semilato)
			{
				Y = 100 + semilato;
			}
			if (Y > $(window).height() - semilato)
			{
				Y = $(window).height() - semilato;
			}			
			$(".CLSlenteingrandimento").css("top", Y - semilato);
			$("img.CLSimmaginelente").css("top", ((topImmagine - event.pageY) * (heightOri / heightImmagine) ) + semilato);
		}
	});
	$( "img.CLSslideshowimmaginecaricata" ).load(function() {
		if($(".CLSlenteingrandimento").length == 0)
		{
			$("body").append("<div class=\"CLSlenteingrandimento CLSdisplaynone\"><img class=\"CLSimmaginelente\" src=\"javascript:void(0)\"></img></div>");
			$("img.CLSimmaginelente").css("left", 0);
			$("img.CLSimmaginelente").css("top", 0);
		}
		widthOri = $("img.CLSslideshowimmaginecaricata").width();
		heightOri = $("img.CLSslideshowimmaginecaricata").height();
		$(".CLSslideshowcaricamento").stop();
		$(".CLSslideshowcaricamento").hide();		
		ridimensionaImmagineSlideshow();
		$(".CLSslideshowimmaginecaricata").show("fade", 1500);
		$("img.CLSimmaginelente").attr("src", $("img.CLSslideshowimmaginecaricata").attr("src"));
		semilato = $(".CLSlenteingrandimento").width() / 2;
		widthImmagine = $(".CLSslideshowcontenitoreimmaginecaricata").width();
		leftImmagine = $(window).width() / 2 - widthImmagine / 2;
		topImmagine = 100;
		heightImmagine = $(window).height() - 100;
		preloadImmaginiAdiacenti();
	});
	$("body").on("mouseenter",".CLSpulsantelente", function() {
		$(this).addClass("CLSevidenziapulsantelente", 300);
	});
	$("body").on("mouseleave",".CLSpulsantelente", function() {
		$(this).removeClass("CLSevidenziapulsantelente", 300);
	});
	$("body").on("click",".CLSpulsantelente", function() {
		if (lenteVisualizzata == 0)
		{
			lenteVisualizzata = 1;
			$(".CLSlenteingrandimento").show("fade", 300);
		}
		else
		{
			lenteVisualizzata = 0;
			$(".CLSlenteingrandimento").hide("fade", 300);
		}
		$(this).toggleClass("CLSpulsantelenteattivo", 300);
	});
	$("body").on("mouseenter",".CLSpowered", function() {
		var testo = "powered by<br /><a target=\"_blank\" href=\"mailto:marco.cazzaro.0@gmail.com\">Marco Cazzaro</a>";
		$(".CLSpoweredtesto").hide().html(testo).show(300);
		$(this).toggleClass("CLSpoweredgrande", 300);
	});
	$("body").on("mouseleave",".CLSpowered", function() {
		var testo = "?";
		$(".CLSpoweredtesto").hide(100).show(300).text(testo);
		$(this).toggleClass("CLSpoweredgrande", 300);
	});
	$("body").on("mouseenter",".CLSlingua", function() {
		$(this).toggleClass("CLSlinguamedia", {duration: 300, easing: "linear"});
	});
	$("body").on("mouseleave",".CLSlingua", function() {
		$(this).toggleClass("CLSlinguamedia", 300);
	});
	$("body").on("click","#IDimpostalinguait", function() {
		var linguaCorrente = $("#IDlingua").text();
		if (linguaCorrente !== "it")
		{
			impostaLinguaCorrente("it");
			$(".CLSlinguait").addClass("CLSlinguagrande", {duration: 200, easing: "linear", complete: function() { location.reload(); }	});
		}
	});
	$("body").on("click","#IDimpostalinguaen", function() {
		var linguaCorrente = $("#IDlingua").text();
		if (linguaCorrente !== "en")
		{
			impostaLinguaCorrente("en");
			$(".CLSlinguaen").addClass("CLSlinguagrande", {duration: 200, easing: "linear", complete: function() { location.reload(); }	});
		}
	});
	$(window).scroll( function() {
		$(".CLSnewsarticolo").each(function() {
			var offset = $(window).scrollTop() + $(window).height() - $(this).offset().top;
			if (offset > 100)
			{
				if (offset < 200) 
				{
					visualizzaImmagineNews($(this));
				} 
				else
				{
					//per il momento lo disattivo
					//$(this).find(".CLSimmaginenews").css("margin-top", -200 - (offset * 0.3));
				}
			}
		  });
	});
	$("#IDmiofooter").on("mouseenter","#IDpulsanteNow", function() {
		$(this).toggleClass("CLSevidenziapulsantenow", 300);
	});
	$("#IDmiofooter").on("mouseleave","#IDpulsanteNow", function() {
		$(this).toggleClass("CLSevidenziapulsantenow", 300);
	});
	$(".CLSinfocookies").on("click","a", function() {
		if ($("#IDinfocookies").length == 0)
		{
			$("body").append("<div id=\"IDinfocookies\" class=\"CLSpannelloinfocookies CLSdisplaynone\"></div>");				
				$( "#IDinfocookies" ).load( "privacy/index.html div", function( response, status, xhr ) {
				  if ( status == "error" ) {
					var msg = "Sorry but there was an error: ";
					alert($(this) + "###" + msg + xhr.status + " " + xhr.statusText );
				  }
				  else
				  {
					$( "#IDinfocookies" ).show(300);
				  }
				});
			$("#IDnews").remove();
			scrollPagina(0);
		}
	});
	$("body").on("click",".CLSchiudiinfocookies", function() {
		$("#IDinfocookies").hide("fade", {duration: 300, complete: function(){
				$("#IDinfocookies").remove();
			}  });
	});
});

(function($){  

    $.fn.SlideshowSfondo = function(vars) {       
        
        var element     = this;
        var timeOut     = (vars.timeOut != undefined) ? vars.timeOut : 1000;
		  var strIDSfondoAttivo = "";
                
        var eseguiSlideshow = function() {
			if (strIDSfondoAttivo == "") {
				transizioneSfondo();
			}
			oggettoTimer = setInterval(function(){transizioneSfondo()},timeOut);
        }
        
        var transizioneSfondo = function() {
			var strTitoloOpera = "";
			var strDirezioneTitolo = "down";
						
			$(strIDSfondoAttivo).hide("fade", durataFade);
			switch (strIDSfondoAttivo) {
				case "":
					strIDSfondoAttivo = "#IDsfondo1";
					strTitoloOpera = "esposizione";
					break;
				case "#IDsfondo1":
					strIDSfondoAttivo = "#IDsfondo2";
					strTitoloOpera = "esposizione";
					break;
				case "#IDsfondo2":
					strIDSfondoAttivo = "#IDsfondo3";
					strTitoloOpera = "debora antonello";
					break;
				case "#IDsfondo3":
					strIDSfondoAttivo = "#IDsfondo4";
					strTitoloOpera = "scogli di acqua e di lame";
					break;
				case "#IDsfondo4":
					strIDSfondoAttivo = "#IDsfondo5";
					strTitoloOpera = "tresor";
					break;
				case "#IDsfondo5":
					strIDSfondoAttivo = "#IDsfondo6";
					strTitoloOpera = "attese dal tempo";
					break;
				case "#IDsfondo6":
					strIDSfondoAttivo = "#IDsfondo7";
					strTitoloOpera = "pesci";
					break;
				case "#IDsfondo7":
					strIDSfondoAttivo = "#IDsfondo8";
					strTitoloOpera = "migranti, non fu il mare a raccoglierci";
					break;
				case "#IDsfondo8":
					strIDSfondoAttivo = "#IDsfondo2";
					strTitoloOpera = "esposizione";
					break;
			}
			if (strIDSfondoAttivo == "#IDsfondo1")
			{
				strIDSfondoAttivo = "#IDsfondo2";
				$(strIDSfondoAttivo).delay(ritardoIniziale).show("fade", durataFade);
			}
			else
			{
				$(strIDSfondoAttivo).show("fade", durataFade);
				$(".CLSsegnapostosfondiattivo").removeClass("CLSsegnapostosfondiattivo", {duration: 300, complete: function(){$("#IDsp" + strIDSfondoAttivo.substr(9)).addClass("CLSsegnapostosfondiattivo", 300);}});
			}
			$(".CLStitolooperasfondo").hide("fade", {duration: 300, direction:strDirezioneTitolo, complete: function(){$(".CLStitolooperasfondo").text(strTitoloOpera);}});
			$(".CLStitolooperasfondo").show("fade", {duration: 1000, direction:strDirezioneTitolo});
        } 
        eseguiSlideshow();
    };  

})(jQuery);  
