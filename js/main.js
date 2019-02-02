$(function() {
    $('#options').select2();
  $('#options').on('change', function() {
    const selectedCategory = $(this).val();
    $('.article-section').empty();

    let topStoriesUrl =
      'https://api.nytimes.com/svc/topstories/v2/' + selectedCategory + '.json';
    topStoriesUrl += '?' + $.param({
        'api-key': 'AxHq6APSkFcxeOGlEzizQkjYvANI0kaI'
      });

    if (selectedCategory !== 'none') {
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: topStoriesUrl
      })
        .done(data => {
          $('.loading__img').hide();
          const topStories = data.results;
          // const headerCategory = $('.header__category');

          const articles = topStories.filter(article => {
            return article.multimedia.length;
         }).slice(0, 12);

        $.each(articles, function() {
            const imageUrl = this.multimedia[4].url;
            const newsAbstract = this.abstract;
            const storyUrl = this.url;
            console.log(newsAbstract); 
            // Create an article box
            $(`<div class='article_box'>`)
              .css('background-image', 'url(' + imageUrl + ')')
              .append(`<a href='${storyUrl}'>'<p class='article__text'>${newsAbstract}</p></a>`)
              .appendTo('.article-section');
            // Move header
            $('.header')
              .css('height', '200px')
              .css('transition', '1s');
            $('.header__logo').css('width', '15vh');
        });
        })
        .fail(() => {
          $('.article-section')
            .append('Sorry there was an error.')
            .css('text-align', 'center');
        });
    }
  });
});
