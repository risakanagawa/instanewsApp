$(function () {
    let topStoriesUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json';
    topStoriesUrl += '?' + $.param({
        'api-key': 'c525f45dacf9413ca3c4cb50cdeff81f'
    });

    $('.loading__img').show();

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: topStoriesUrl
    })
        .done(function (data) {
            $('.loading__img').hide();
            const topStories = data.results;

            const categories = topStories.reduce((i, val) => (i.indexOf(val.section) !== -1) ? i : [...i, val.section], []);
            $.each(categories, function (i) {
                $('.header__category').append('<option value=' + categories[i].replace(' ', '') + '>' + categories[i] + '</option>');
            });
            $('.header__category').select2({
                width: '200px',
                placeholder: 'Please Select',
                allowClear: true
            });

            $('#options').on('change', function () {

                const selectedCategory = $(this).val();
                $('.article-section').empty();

                const articlesByCategory = topStories.filter(function (article) {
                    const thisCategory = article.section.replace(' ', '');
                    if (selectedCategory === thisCategory && article.multimedia.length !== 0) {
                        return article;
                    }
                });
                const firstTwelveArticlesByCategory = articlesByCategory.slice(0, 12);

                $.each(firstTwelveArticlesByCategory, function () {
                    const imageUrl = this.multimedia[4].url;
                    const newsAbstract = this.abstract;

                    // Create an article box
                    $('<div class="article_box">')
                        .css('background-image', 'url(' + imageUrl + ')')
                        .append('<p class="article__text">' + newsAbstract + '</p>')
                        .appendTo('.article-section');

                    // Move header
                    $('.header')
                        .css('height', '200px')
                        .css('transition', '1s');
                    $('.header__logo')
                        .css('width', '15vh');
                });
            });
        })
        .fail(function () {
            $('.article-section').append('Sorry there was an error.')
                                 .css('text-align', 'center');
        });
});

