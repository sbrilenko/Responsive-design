$(window).resize(function()
{
    if($('.input').length>0) $('.input').slideUp(500,function(){$(this).remove()})
    $('.cub>div').removeClass('active')
})
$(document).ready(function(){
    function music(url)
    {
        var widgetIframe = document.getElementById('sc-widget'),
            widget       = SC.Widget(widgetIframe),
            newSoundUrl = url;

        widget.bind(SC.Widget.Events.READY, function() {
            // load new widget
            widget.bind(SC.Widget.Events.FINISH, function() {
                widget.load(newSoundUrl, {
                    show_artwork: false
                });
            });
        });
    }
    function size()
    {
        var width=$(window).width();
        if(width>=980) return 3
        if(width>=645 && width<980) return 2
        if(width<645) return 1
    }
    function scrollToElement()
    {
        $('.input').slideDown(500,function(){
            var offs=$(this).offset()
            $('html, body').animate({
                scrollTop: offs.top
            }, 1000);

        })
    }
    function caseMV(type,template_music,template_video,obj)
    {
        switch(type)
        {
            case 'music':
                var replace_template_music=template_music.replace("{triangle}",obj.triangle_class)
                    .replace("{file}",obj.file)
                    .replace("{title}",obj.title)
                    .replace("{description}",obj.description)
                $(replace_template_music).insertAfter(index_input)
                music(obj.file)
                scrollToElement()
                break;
            case 'video':
            case 'movie':
                var replace_template_video=template_video.replace("{triangle}",obj.triangle_class)
                    .replace(new RegExp("{file}",'g'),obj.file)
                    .replace("{title}",obj.title)
                    .replace("{description}",obj.description)
                $(replace_template_video).insertAfter(index_input)
                scrollToElement()
                break;
        }
    }

    istouch=((!!('ontouchstart' in window)))?'touchstart':'click';
    $('.cub>div').on(istouch,function()
    {
        var template_music='<div class="input">{triangle}<div class="padding-inside">' +
            '<iframe id="sc-widget" width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//{file}&amp;buying=false&amp;show_artwork=false&amp;show_comments=false&amp;download=true"></iframe>' +
            '<div class="after-file-i"><div class="input-title">{title}<div class="input-type">Музыка</div></div>' +
            '<div class="share"><div class="f-l">Share</div><a href=""><div class="soc-f f-l"></div></a><a href="#"><div class="soc-t f-l"></div></a><a href="#"><div class="soc-gp f-l"></div></a><a href="#"><div class="soc-vk f-l"></div></a></div><div class="clear"></div><div class="input-description">{description}</div></div></div></div>';
        var template_video='<div class="input" >{triangle}<div class="padding-inside">' +
            '<object width="100%" height="492"><param name="movie" value="{file}" /><param name="wmode" value="transparent" /><embed src="{file}" type="application/x-shockwave-flash" wmode="transparent" width="100%" height="492" /></object>' +
            '<div class="after-file-i"><div class="input-title">{title}<div class="input-type">Видео</div></div><div class="share"><div class="f-l">Share</div><a href=""><div class="soc-f f-l"></div></a><a href=""><div class="soc-t f-l"></div></a><a href=""><div class="soc-gp f-l"></div></a><a href=""><div class="soc-vk f-l"></div></a></div><div class="clear"></div>' +
            '<div class="input-description">{description}</div></div></div></div>'
        var size_=size(),th=$(this),
            type=$('[name=type]',$(this)).val(),
            file=$('[name=file]',$(this)).val(),
            description=$('[name=description]',$(this)).val(),
            title=$('[name=title]',$(this)).val(),
            number=$('[name=number]',$(this)).val(),
            triangle=Math.abs(number/size_-Math.ceil(number/size_)),triangle_class="<div class='triangle-left'></div>",
            obj={};

        if(size_==3)
        {
            if(triangle==0) triangle_class="<div class='triangle-right'></div>";
            else if(triangle>0.6) triangle_class="<div class='triangle-left'></div>";
            else triangle_class="<div class='triangle-center'></div>";
        }
        else
        if(size_==2)
        {
            if(triangle==0) triangle_class="<div class='triangle-center'></div>";
            else triangle_class="<div class='triangle-left'></div>";
        }
        obj={triangle_class:triangle_class,type:type,file:file,description:description,title:title}
        index_input=$('.cub>div:not(.input)').eq(Math.ceil(number/size_)*size_-1)
        if(index_input.length==0) index_input=$('.cub>div:not(.input)').eq($('.cub>div:not(.input)').length-1);
        if(th.hasClass('active'))
        {
            $('.input').slideUp(500,function(){$('.input').remove();$('.cub>div').removeClass('active')})
        }
        else
        {
            if($('.input').length>0)
            {
                $('.input').slideUp(500,function(){$('.input').remove();$('.cub>div').removeClass('active');th.addClass('active')
                    caseMV(type,template_music,template_video,obj)
                })
            }
            else
            {
                th.addClass('active')
                caseMV(type,template_music,template_video,obj)
            }

        }

    })
})

