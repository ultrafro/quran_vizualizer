%% cross check juz
close all
clear *
clc
load('aya_numbers.mat');
load('juz.mat');

for ii = 2:size(q,1)
   
    surah = (q{ii,1});
    aya = (q{ii,2});
    
    juz_num = -1;
    hizb_num = -1;
    for jj = 1:size(juz,1)
        
        after_beginning = 1;
        if(surah < juz(jj,3))
            after_beginning = 0;
        end
        
        if(surah == juz(jj,3))
           if(aya < juz(jj,4))
              after_beginning = 0; 
           end
        end
        
        before_ending = 1;
        if(surah > juz(jj,5))
            before_ending = 0;
        end
        
        if(surah == juz(jj,5))
           if(aya > juz(jj,6))
              before_ending = 0; 
           end
        end
        
        if(after_beginning & before_ending)
            juz_num = juz(jj,1);
            hizb_num = juz(jj,2);
        end
        
    end
    
    if(juz_num==-1)
       debug = 5; 
    end
    
    q{ii,3} = juz_num;
    q{ii,4} = hizb_num;
    
    
    
end