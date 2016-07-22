$(function () {
  var opportunities = (function() {
    var cardList;

    // Sorting functions
    function sortAZ() {
      cardList.sort('title', { order: "asc" });
    }

    function sortZA() {
      cardList.sort('title', { order: "desc" });
    }

    function sortH2l() {
      cardList.sort('raising', { order: "desc" });
    }

    function sortL2h() {
      cardList.sort('raising', { order: "asc" });
    }

    function sortNewest() {
      cardList.sort('date', { sortFunction: function(a, b) {
        var aa = a.values().date.split('/').reverse().join(),
            bb = b.values().date.split('/').reverse().join();

        return aa > bb ? -1 : (aa > bb ? 0 : 1);
      }});
    }

    function sortOldest() {
      cardList.sort('date', { sortFunction: function(a, b) {
        var aa = a.values().date.split('/').reverse().join(),
            bb = b.values().date.split('/').reverse().join();

        return aa < bb ? -1 : (aa > bb ? 1 : 0);
      }});
    }


    // Filtering functions
    function filterBy(value, query) {
      cardList.filter(function(item) {
        if (item.values()[value].indexOf(query) !== -1) {
          return true
        }

        return false;
      });
    }

    function buttonFilter(tag, $el) {
      if ($el.hasClass('active')) {
        cardList.filter();
      } else {
        filterBy('tag', tag);
      }
    }

    function checkboxFilter(value, $el) {
      var name = $el[0].name;

      if ($el.is(':checked')) {
        filterBy(value, name);
      } else {
        cardList.filter();
      }
    }

    function resetSearch() {
      cardList.fuzzySearch.search('');
    }

    function setBindings() {
      $('#sort-az').click(function() {
        sortAZ();
      });

      $('#sort-za').click(function() {
        sortZA();
      });

      $('#sort-h2l').click(function() {
        sortH2l();
      });

      $('#sort-l2h').click(function() {
        sortL2h();
      });

      $('#sort-newest').click(function() {
        sortNewest();
      });

      $('#sort-oldest').click(function() {
        sortOldest();
      });


      $('#filter-health').click(function() {
        buttonFilter('health', $(this));
      });

      $('#filter-software').click(function() {
        buttonFilter('software', $(this));
      });

      $('#filter-learning').click(function() {
        buttonFilter('learning', $(this));
      });

      $('#filter-education').click(function() {
        buttonFilter('education', $(this));
      });


      $('.filters-sector input').change(function() {
        checkboxFilter('sector', $(this));
      });

      $('.filters-stage input').change(function() {
        checkboxFilter('stage', $(this));
      });

      $('.filters-region input').change(function() {
        checkboxFilter('region', $(this));
      });

      $('.filters-tags input').change(function() {
        checkboxFilter('tag', $(this));
      });


      $('#clear-search').click(function() {
        $('#search-cards').val('');
        resetSearch();
      });
    }

    function init() {
      var options = {
        valueNames: ['title', 'likes', 'raising', 'tag', 'date', 'sector', 'stage', 'region'],
        plugins: [ ListFuzzySearch() ]
      };

      cardList = new List('filter-cards', options);

      setBindings();
    }

    return {
      init: init
    }
  }());

  opportunities.init();
});
