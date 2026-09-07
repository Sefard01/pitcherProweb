// Terminal typing / diff reveal
(function(){
  var lines = document.querySelectorAll('#termBody [data-line]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){
    lines.forEach(function(l){ l.classList.add('show'); });
  } else {
    var i = 0;
    function next(){
      if(i < lines.length){
        lines[i].classList.add('show');
        i++;
        setTimeout(next, 420);
      } else {
        setTimeout(function(){
          lines.forEach(function(l){ l.classList.remove('show'); });
          i = 0;
          setTimeout(next, 600);
        }, 2600);
      }
    }
    var termObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ next(); termObserver.disconnect(); }
      });
    }, {threshold:0.3});
    termObserver.observe(document.getElementById('termBody'));
  }

  // pour stream + drifting symbols
  var reducedM = reduced;
  var stream = document.getElementById('pourStream');
  var syms = [document.getElementById('sym1'), document.getElementById('sym2'), document.getElementById('sym3'), document.getElementById('sym4')];
  var positions = [{left:126, top:24},{left:146,top:38},{left:164,top:52},{left:178,top:68}];
  syms.forEach(function(s, idx){ s.style.left = positions[idx].left+'px'; s.style.top = positions[idx].top+'px'; });

  if(!reducedM){
    var pourObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          stream.style.transition = 'stroke-dashoffset 1.1s ease';
          stream.style.strokeDashoffset = '0';
          runSymbols();
          pourObserver.disconnect();
        }
      });
    }, {threshold:0.3});
    pourObserver.observe(document.getElementById('pourStage'));

    function runSymbols(){
      var d = 0;
      syms.forEach(function(s){
        animateSym(s, d);
        d += 550;
      });
    }
    function animateSym(el, delay){
      setTimeout(function loop(){
        el.animate([
          {opacity:0, transform:'translateY(0px)'},
          {opacity:1, transform:'translateY(6px)', offset:0.3},
          {opacity:1, transform:'translateY(14px)', offset:0.7},
          {opacity:0, transform:'translateY(22px)'}
        ], {duration:1400, easing:'ease-in-out'});
        setTimeout(loop, 1700);
      }, delay);
    }
  } else {
    stream.style.strokeDashoffset = '0';
  }
})();

(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll('.section-head, .what-block, .privacy-box, .showcase-frame, .final-cta, footer');
  var staggerTargets = document.querySelectorAll('.feat-grid, .uc-grid, .dx-grid, .flow, .ps-grid, .tech-cloud, .compare');

  revealTargets.forEach(function(element){ element.classList.add('reveal'); });
  staggerTargets.forEach(function(element){ element.classList.add('reveal', 'reveal-stagger'); });

  if(reduced){
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(element){ element.classList.add('is-visible'); });
    return;
  }

  var revealObserver = new IntersectionObserver(function(entries, observer){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.14, rootMargin:'0px 0px -40px'});

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(element){ revealObserver.observe(element); });
})();
